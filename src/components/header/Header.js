import React, { useEffect, useState } from "react";
import "./header.css";

import shortId from "shortid";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "../info-box/InfoBox";
import {
  getCountryData,
  setCasesType,
  setCoordinates,
  setMapCountry,
  setZoom,
} from "../../redux/TableData/table.data.actions";
import { useDispatch, useSelector } from "react-redux";
import { sortData } from "../../util";

const Header = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([]);

  const table = useSelector((state) => state.table);
  const { casesType } = table;

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            id: shortId(),
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          dispatch(getCountryData(sortedData));
          setCountries(countries);
          dispatch(setMapCountry(data));
        });
    };
    getCountriesData();
  }, [dispatch]);

  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        dispatch(
          setCoordinates(
            { lat: data.countryInfo.lat, lng: data.countryInfo.long },
          ),
        );
        dispatch(setZoom(5));
      });
  };

  return (
    <div className="header">
      <div className="header__title">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="header__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={handleCountryChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="header__stats">
        <InfoBox
          isRed
          active={casesType === "cases"}
          onClick={() => dispatch(setCasesType("cases"))}
          title="Coronavirus Cases"
          total={countryInfo.cases}
          cases={countryInfo.todayCases}
        />
        <InfoBox
          active={casesType === "recovered"}
          onClick={() => dispatch(setCasesType("recovered"))}
          title="Recovered"
          total={countryInfo.recovered}
          cases={countryInfo.todayRecovered}
        />
        <InfoBox
          isRed
          active={casesType === "deaths"}
          onClick={() => dispatch(setCasesType("deaths"))}
          title="Deaths"
          total={countryInfo.deaths}
          cases={countryInfo.todayDeaths}
        />
      </div>
    </div>
  );
};

export default Header;
