import "./currency.css";

export default Currency = () => {
  return (
    <div>
      <p className="title">The Best trades</p>
      <div className="currency">
        <p className="bid">bid</p>
        <p className="ask">ask</p>
      </div>
    </div>
  );
};
