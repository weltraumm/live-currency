import { useEffect, useState } from "react";
import "../styles/prices.css";
import moment from "moment";
import socketSubscribe from "../webSocketAPI";
import { CurrencySelect } from "./currencySelect.js";

const currencies = [
  "EURUSD",
  "GBPUSD",
  "USDJPY",
  "USDRUB",
  "AUDUSD",
  "USDCHF",
  "XBRUSD",
  "BTCEUR",
  "BTCUSD",
  "LTCUSD",
  "LTCUSD",
  "AAPL",
  "AMZN",
  "NFLX",
];

function Prices({ address, id, keyy, secret }) {
  const [time, setTime] = useState(Date.now());
  const [bid, setBid] = useState(0);
  const [ask, setAsk] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);

  useEffect(() => {
    let socket = socketSubscribe(address, id, keyy, secret, currency);
    console.log(socket);
    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      console.log(message);
      console.log(message.Response);
      if (message.Response === "FeedSubscribe") {
        setTime(message.Result.Snapshot[0].Timestamp);
        setBid(message.Result.Snapshot[0].BestBid.Price);
        setAsk(message.Result.Snapshot[0].BestAsk.Price);
      } else if (message.Response === "FeedTick") {
        setTime(message.Result.Timestamp);
        setBid(message.Result.BestBid.Price);
        setAsk(message.Result.BestAsk.Price);
      }
    };
    return () => socket.close();
  }, []);

  let changeCurrency = (value) => {
      setCurrency(value);
  };

  return (
    <>
      <CurrencySelect changeCurrency={changeCurrency}/>
      <div className="currency">
        <div>
          <p className="small_text">bid</p>
          <p className="green price">{bid}</p>
        </div>
        <div>
          <p className="small_text">ask</p>
          <p className="red price">{ask}</p>
        </div>
      </div>
      <div>
        <p className="small_text">for the</p>
        <p className="date_text">{moment(time).toString()}</p>
      </div>
    </>
  );
}

export { Prices };
