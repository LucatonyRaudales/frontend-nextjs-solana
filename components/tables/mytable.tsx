import TicketModal from "../modal/ticket";

export default function MyTable({ data }: localInterface) {
  return (
    <table className="table w-screen">
      <thead>
        <tr>
          <th>Buyer info</th>
          <th>Lottery</th>
          <th>Store name</th>
          <th>city game ticket</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((tx, index) => (
          <tr key={index}>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/solana-sol.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold uppercase">
                    {tx.buyerFirstName + " " + tx.buyerLastName}
                  </div>
                  <div className="text-sm opacity-50 lowercase">
                    {tx.buyerEmail ?? "---"}
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="font-bold uppercase">{tx.gameName}</div>
              <div className="text-sm opacity-50 ">
                {new Date(parseInt(tx.drawDay)).toString().split("GMT")[0] ??
                  "---"}
              </div>
            </td>
            <td>
              <div className="font-bold uppercase">{tx.sellerShop}</div>
              <div className="text-sm opacity-50 lowercase">
                {new Date(parseInt(tx.purchaseDate))
                  .toString()
                  .split("GMT")[0] ?? "---"}
              </div>
            </td>
            <td>
              <div className="font-bold uppercase">{tx.cityPowerBall}</div>
            </td>
            <th>
              <TicketModal data={tx} index={index} />
            </th>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Buyer info</th>
          <th>Lottery</th>
          <th>Store name</th>
          <th>city game ticket</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
}

interface localInterface {
  data: myTableInterface[];
}
export interface myTableInterface {
  buyerFirstName: string;
  buyerLastName: string;
  buyerEmail: string;
  sellerShop: string;
  purchaseDate: string;
  gameName: string;
  drawDay: string;
  ticketId: string;
  saleNumber: Number;
  powerBall: Number[];
  ticketPrice: Number;
  cityPowerBall: string;
}
