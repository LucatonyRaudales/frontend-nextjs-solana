const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaTicket;
  const baseAccount = anchor.web3.Keypair.generate();
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log("📝 Your transaction signature", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);

  const data = {
    buyerFirstName: "Tony",
    buyerLastName: "Raudales",
    buyerEmail: "tony.raudales@test.hn",
    sellerShop: "Tienda amadito",
    purchaseDate: Date.now().toString(),
    gameName: "Power play",
    drawDay: Date.now().toString(),
    ticketId: "3213-432432-4332",
    saleNumber: 5433543,
    powerBall: [1, 43, 5, 65, 7],
    ticketPrice: 2,
    cityPowerBall: "Bogota",
  };

  // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
  const res = await program.rpc.addTicket(data, {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  console.log("respuesta add ticket1", res);

    const data2 = {
      buyerFirstName: "Tony",
      buyerLastName: "Raudales",
      buyerEmail: "tony.raudales@test.hn",
      sellerShop: "Tienda amadito",
      purchaseDate: Date.now().toString(),
      gameName: "Power play",
      drawDay: Date.now().toString(),
      ticketId: "3213-432432-4332",
      saleNumber: 5433543,
      powerBall: [1, 43, 5, 65, 7],
      ticketPrice: 2,
      cityPowerBall: "Bogota",
    };

    // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
    const res2 = await program.rpc.addTicket(data2, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });
  
  console.log("respuesta add ticket2", res2);

  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);

  // Access gif_list on the account!
  console.log("👀 ticket List", account.ticketsList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
