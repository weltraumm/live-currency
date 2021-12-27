import { useEffect, useState } from "react";
import "../styles/prices.scss";
import moment from "moment";
import socketSubscribe from "../webSocketAPI.js";
import { CurrencySelect } from "./CurrencySelect.jsx";
import { currencies } from "../currenciesList.js";

function Prices() {
  const [time, setTime] = useState(Date.now());
  const [bid, setBid] = useState(0);
  const [ask, setAsk] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_SECRET = process.env.REACT_APP_API_SECRET;

  useEffect(() => {
    let socket = socketSubscribe(
      API_URL,
      CLIENT_ID,
      API_KEY,
      API_SECRET,
      currency
    );
    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
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
  }, [currency]);

  let changeCurrency = (value) => {
    setCurrency(value);
  };

  return (
    <>
      <CurrencySelect changeCurrency={changeCurrency} />
      <div className="prices_container">
        <div>
          <p className="small_text">bid</p>
          <p className="green price_field">{bid}</p>
        </div>
        <div>
          <p className="small_text">ask</p>
          <p className="red price_field">{ask}</p>
        </div>
      </div>
      <div>
        <p className="small_text">for the</p>
        <p className="date">{moment(time).toString()}</p>
      </div>
    </>
  );
}

export { Prices };
