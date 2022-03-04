import { myTableInterface } from "../components/tables/mytable";
import axios from "axios";

export const sendDataService = async (
  data: DataInterface,
  program: any,
  account: AccountInterface
) => {
  try {
    const dataParsed: myTableInterface = {
      buyerFirstName: data.firstName,
      buyerLastName: data.lastName,
      buyerEmail: data.email,
      sellerShop: "Scrummers tickets shop",
      purchaseDate: Date.now().toString(),
      gameName: data.gameName,
      drawDay: Date.parse(data.drawDay).toString(),
      ticketId: `${getRandomNumber(4)}-${getRandomNumber(8)}-${getRandomNumber(
        5
      )}`,
      saleNumber: 1,
      powerBall: [
        parseInt(data.n1),
        parseInt(data.n2),
        parseInt(data.n3),
        parseInt(data.n4),
        parseInt(data.n5),
        parseInt(data.n6),
      ],
      ticketPrice: parseInt(data.ticketPrice),
      cityPowerBall: data.cityPowerBall,
    };

    console.log("to send", dataParsed);
    const res = await program.rpc.addTicket(dataParsed, account);
    console.log("res", res);
    const db = new DataBase();
    const saved = await db.saveTransactionHash({
      hash: res,
      ticketID: dataParsed.ticketId,
    });

    return saved;
  } catch (error) {
    return false;
  }
};

const getRandomNumber = (length: number) => {
  let a = [];
  for (let i = 0; i < length; i++) {
    a.push(Math.floor(Math.random() * 10));
  }
  return a.join().replaceAll(",", "");
};

interface DataInterface {
  cityPowerBall: string;
  drawDay: string;
  email: string;
  firstName: string;
  gameName: string;
  lastName: string;
  n1: string;
  n2: string;
  n3: string;
  n4: string;
  n5: string;
  n6: string;
  ticketPrice: string;
}

interface AccountInterface {
  accounts: {
    baseAccount: any;
    user: any;
  };
}

export class DataBase {
  constructor() {
    this.backendUrl = process.env.NEXT_PUBLIC_BACKEND;
  }
  backendUrl: string;

  saveTransactionHash = async (data: DataToSaveInMongo) => {
    try {
      const ticket = await axios.post(`${this.backendUrl}/ticket`, data);
      return ticket.status == 200;
    } catch (e) {
      return false;
    }
  };

  getTicketHash = async (ticketID: string) => {
    try {
      const ticket = await axios.get(`${this.backendUrl}/ticket/${ticketID}`);
      return ticket.data as DataToReturn;
    } catch (error) {
      return null;
    }
  };
}
interface DataToSaveInMongo {
  ticketID: string;
  hash: string;
}

interface DataToReturn {
  message: string;
  data: {
    _id: string;
    ticketID: string;
    hash: string;
    createdAt: Date;
    __v: number;
  };
}
