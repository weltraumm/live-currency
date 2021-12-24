import { useEffect, useState } from "react";
import "./App.css";
import moment from "moment";
import socketSubscribe from "./webSocketAPI";

function App() {
  const [time, setTime] = useState(Date.now());
  const [bid, setBid] = useState(0);
  const [ask, setAsk] = useState(0);

  useEffect(()=>{
    let socket = socketSubscribe(ADDRESS,ID,KEY,SECRET);
    console.log(socket);
    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      console.log(message);
      console.log(message.Response)
      if(message.Response==='FeedTick'){
      setTime(message.Result.Timestamp);
      setBid(message.Result.BestBid.Price);
      setAsk(message.Result.BestAsk.Price);
      }
      
    };
    return () => socket.close();
  },[])

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
