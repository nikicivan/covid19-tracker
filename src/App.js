import React from "react";

import "./App.css";
import Header from "./components/header/Header";
import Map from "./components/map/Map";
import Table from "./components/table/Table";
import { Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import LineGraph from "./components/line-graph/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const table = useSelector((state) => state.table);
  const { tableData, coordinates, zoom, mapCountry, casesType } = table;

  return (
    <div className="app">
      <div className="app__left">
        <Header />
        <Map
          casesType={casesType}
          center={coordinates}
          zoom={zoom}
          countries={mapCountry}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
