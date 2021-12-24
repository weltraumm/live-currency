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
  "AAPL",
  "AMZN",
  "NFLX",
];

export const CurrencySelect = ({ changeCurrency }) => (
  <>
    <div >
      <span>init</span>
      <div></div>
    </div>
    <ul className="currency_dropdown">
      {currencies.map((currency) => {
        return <li key={currency} className="li_currency">{currency}</li>;
      })}
    </ul>
  </>
);
