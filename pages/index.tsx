import Image from "next/image";
import { useRouter } from "next/router";
import idl from "../settings/solana_ticket.json";
import kp from "../settings/keypair.json";
import { ToastContainer, toast } from "react-toastify";
import MyFooter from "../components/footer/myFooter";
import ErrorAlert from "../components/alerts/error";
import React, { useEffect, useState } from "react";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  ConfirmOptions,
} from "@solana/web3.js";
import { Idl, Program, Provider, web3 } from "@project-serum/anchor";
import MyTable, { myTableInterface } from "../components/tables/mytable";
import NewPurchaseForm from "../components/forms/NewPurchaseForm";
import { sendDataService } from "../services/data";
import Spinner from "../components/svgs/Spinner.svg";
// SystemProgram is a reference to   Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// Get our program's id from the IDL as Idl file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl("devnet");

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed",
};

declare const window: Window &
  typeof globalThis & {
    solana: any;
  };

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [ticketsList, setTicketsList] = useState<myTableInterface[]>([]);
  const [havePhantom, setHavePhantom] = useState<boolean>(false);
  const [savingData, setSavingData] = useState<boolean>(false);
  const router = useRouter();

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          solana;
          setHavePhantom(true);
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      // console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const getProvider = () => {
    const connection = new Connection(
      network,
      opts.preflightCommitment as ConfirmOptions
    );
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment as ConfirmOptions
    );
    return provider;
  };

  const createTicketAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl as Idl, programID, provider);
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      await getTicketsList();
    } catch (error) {}
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <div className="w-full flex justify-center">
      {havePhantom ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={connectWallet}
        >
          Connect to Wallet
        </button>
      ) : (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-full"
            onClick={() => console.log("pressed")}
          >
            Install Phantom extension
          </button>
        </div>
      )}
    </div>
  );
  const onSubmit = async (data) => {
    setSavingData(true);
    const provider = getProvider();
    const program = new Program(idl as Idl, programID, provider);
    const account = {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    };

    const res = await sendDataService(data, program, account);
    console.log("res senDataService", res);
    if (res) await getTicketsList();
    setSavingData(false);
  };
  const renderConnectedContainer = () => {
    // If we hit this, it means the program account hasn't been initialized.
    if (ticketsList === null) {
      return (
        <div className="h-screen w-screen flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-ful"
            onClick={createTicketAccount}
          >
            Initialize my account
          </button>
        </div>
      );
    }
    // Otherwise, we're good! Account exists. User can submit GIFs.
    else {
      return (
        <div className="h-full">
          <div className="flex justify-center pt-10 uppercase font-bold text-lg">
            Scrummers ticket shop
          </div>
          <div className="flex justify-center">
            <NewPurchaseForm onSubmit={onSubmit} isSending={savingData} />
          </div>
          {ticketsList.length > 0 ? (
            <MyTable data={ticketsList} />
          ) : (
            <div className="w-screen flex justify-center">charging...</div>
          )}
        </div>
      );
    }
  };

  const getTicketsList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl as Idl, programID, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log("the account", account);
      setTicketsList(account.ticketsList);
    } catch (error) {
      setTicketsList(null);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      getTicketsList();
    }
  }, [walletAddress]);

  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col h-screen">
        <div className="flex h-screen items-center pb-5">
          {!walletAddress && renderNotConnectedContainer()}
          {/* We just need to add the inverse here! */}
          {walletAddress && renderConnectedContainer()}
        </div>
        {
          // <MyFooter />
        }
      </div>
    </div>
  );
};

export default App;
