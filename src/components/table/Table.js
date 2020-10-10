import React from "react";
import "./table.css";
import numeral from "numeral";

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries?.map((country) => (
        <div className="table__content" key={country.country}>
          <p>{country.country}</p>
          <p>
            <strong>
              {numeral(country.cases).format("0,0")}
            </strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Table;
