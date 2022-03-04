import Image from "next/image";
import mypic from "../images/qr.png";
import barcode from "../images/barcode.png";

export default function ticket() {
  return (
    <div className="w-screen h-screen flex  justify-center">
      <div className="card flex items-center h-1/2 w-1/3 card-bordered card-compact lg:card-normal my-3 py-3">
        <div>
          <h2>MINNESOTA</h2>
          <Image
            src="https://www.pngkey.com/png/full/188-1880371_powerball-logo.png"
            alt="Picture of the author"
            width={200}
            height={35}
          />
        </div>
        <p className="pt-5">0000-000000000000-00000</p>
        <div>----------------------------------------</div>
        <span className="font-mono font-light text-xl uppercase mb">
          power play no
        </span>
        <div>
          <span className="text-xs">001 </span>
          <span className="font-bold text-md">1522 39 60 67 05</span>
        </div>
        <div>----------------------------------------</div>

        {/* info */}
        <span className="uppercase text-xs tracking-wide">wed jun 10 22</span>
        <div className="grid grid-flow-col auto-cols-max">
          <span className="break-normal truncate">432432432</span>
          <div className="grid grid-rows-2 flex justify-center">
            <span className="font-bold text-lg flex justify-center">$2.0</span>
            <span className="font-light text-xs flex justify-center">
              06/10/22 06:17:47
            </span>
            <span className="font-light text-xs">0000-000000000000-00000</span>
          </div>
          <div>
            <Image
              src={mypic}
              alt="Picture of the author"
              width="100px"
              height="100px"
            />
          </div>
        </div>

        {/* footer */}
        <span className="w-2/3 py-7 text-xs text-center">
          Check your ticket! For winning numbers, go to mnlottery.com or visit
          any lottery retailer.
        </span>
        <Image
          src={barcode}
          alt="Picture of the author"
          width="250px"
          height="40px"
        />
      </div>
    </div>
  );
}
