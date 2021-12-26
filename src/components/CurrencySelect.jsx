import { useState } from "react";
import { currencies } from "../currenciesList.js";
import "../styles/currencySelect.scss";

export const CurrencySelect = ({ changeCurrency }) => {
  const [currency, setCurrency] = useState(currencies[0]);

  return (
    <>
      <div className="main_field">
        <span>{currency}</span>
        <div className="triangle"></div>
      </div>
      <ul className="dropdown">
        {currencies.map((currency) => {
          return (
            <li
              onClick={(e) => {
                setCurrency(e.target.innerHTML);
                changeCurrency(e.target.innerHTML);
              }}
              key={currency}
              className="dropdown_field"
            >
              {currency}
            </li>
          );
        })}
      </ul>
    </>
  );
};
