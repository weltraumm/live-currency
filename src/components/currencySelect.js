import { useState } from "react";

export const currencies = [
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

export const CurrencySelect = ({ changeCurrency }) => {
  const [currency, setCurrency] = useState(currencies[0]);  

  return (
    <>
      <div>
        <span>{currency}</span>
      </div>
      <div>
        <ul className="currency_dropdown">
          {currencies.map((currency) => {
            return (
              <li
                onClick={(e) => {
                  setCurrency(e.target.innerHTML);
                  changeCurrency(e.target.innerHTML)}}
                key={currency}
                className="li_currency"
              >
                {currency}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
