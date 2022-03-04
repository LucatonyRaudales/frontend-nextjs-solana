import Image from "next/image";
import { myTableInterface } from "../tables/mytable";
import { DataBase } from "../../services/data";
import { useState } from "react";

export default function TicketModal({ data, index }: ticketInterface) {
  const [hash, setHash] = useState<string>(null);
  const db = new DataBase();

  const getTxHash = async () => {
    const theHash = await db.getTicketHash(data.ticketId);
    console.log("the hash is", theHash);
    if (theHash.data.hash) setHash(theHash.data.hash);
  };
  return (
    <>
      <label
        onClick={getTxHash}
        htmlFor={`my-modal-${index}`}
        className="btn btn-sm btn-outline btn-accent modal-button"
      >
        more info
      </label>
      <input
        type="checkbox"
        id={`my-modal-${index}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-center">
            <div className="card flex items-center card-bordered card-compact lg:card-normal my-3 py-3">
              <div>
                <h2>{data.cityPowerBall} </h2>
                <Image
                  src="https://www.pngkey.com/png/full/188-1880371_powerball-logo.png"
                  alt="Picture of the author"
                  width={200}
                  height={35}
                />
              </div>
              <p className="pt-5">{data.ticketId}</p>
              <div>------------------------------</div>
              <span className="font-mono font-light text-xl uppercase">
                {data.gameName}
              </span>
              <div>
                <span className="font-bold text-lg">
                  {data.powerBall.map((item) => ` ${item}`)}
                </span>
              </div>

              {/* info */}
              <span className="uppercase text-xs py-2 tracking-wide">
                {new Date(parseInt(data.drawDay))
                  .toString()
                  .split(" ")
                  .map((item, index) => index < 4 && `${item} `)}
              </span>

              <div>----------------------------</div>
              <div className="grid grid-flow-col gap-2 p-4 auto-cols-max flex items-center">
                <div className="grid grid-rows-2  -gap-1 px-4">
                  <span className="font-bold text-md ">Ticket information</span>
                  <div>
                    <span> $ {data.ticketPrice.toFixed(2)}</span>
                    <span className="text-xs flex justify-center">
                      {
                        new Date(parseInt(data.purchaseDate))
                          .toString()
                          .split("GMT")[0]
                      }
                    </span>
                  </div>
                </div>
                <div className="">
                  <Image
                    src={`http://api.qrserver.com/v1/create-qr-code/?data=https://explorer.solana.com/address/${hash}?cluster=devnet!&size=250x250&bgcolor=3d4451`}
                    alt="Picture of the author"
                    width="100px"
                    height="100px"
                  />
                </div>
              </div>

              {/* footer */}
              <div className="py-4">
                <p className="font-light text-xs">
                  Save your ticket, you can be the winner,
                </p>
                <p className="font-light text-xs">
                  scan the qr code for more information.
                </p>
              </div>
            </div>
          </div>
          <div className=" modal-action">
            <label htmlFor={`my-modal-${index}`} className="btn btn-accent">
              Accept
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

interface ticketInterface {
  data: myTableInterface;
  index: Number;
}
