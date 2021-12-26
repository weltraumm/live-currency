import "../styles/app.scss";
import { Prices } from "./Prices.jsx";

const ADDRESS = "wss://marginalttlivewebapi.fxopen.net:3000";
const ID = "eeb62ec4-31fd-4bf6-b580-be81e22ddc5c";
const KEYY = "DHKfZEtAWNhWNy9n";
const SECRET =
  "eZDE6MNHJGP5zWSEDXFMgF2PZ6JqtkdxRD82HNQma9A84fH86m36DmsH8YPabxnz";

export default function App() {
  return (
    <div className="app">
      <p className="title">THE BEST</p>
      <p className="title">TRADE OFFERS</p>
      <Prices keyy={KEYY} address={ADDRESS} id={ID} secret={SECRET} />
    </div>
  );
}
