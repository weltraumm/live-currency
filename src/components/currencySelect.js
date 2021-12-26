import { useState } from "react";
import { currencies } from "../currenciesList";

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
