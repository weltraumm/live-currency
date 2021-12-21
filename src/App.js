import { useEffect, useState } from "react";
import "./App.css";
import moment from "moment";

const URL = "https://ttlivewebapi.fxopen.net:8443/api/v2/public/level2/EURUSD";
const DELAY = 1000;

function App() {
  const [time, setTime] = useState(0);
  const [bid, setBid] = useState(0);
  const [ask, setAsk] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(URL)
        .then((response) => response.json())
        .then((json) => {
          setTime(json[0].Timestamp);
          setBid(json[0].BestBid.Price);
          setAsk(json[0].BestAsk.Price);
        });
    }, DELAY);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      <p className="title">THE BEST</p>
      <p className="title">TRADE OFFERS</p>
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
    </div>
  );
}

export default App;
