import React from "react";
import "./infoBox.css";

import { prettyPrintStat } from "../../util";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoBox = ({ title, cases, active, isRed, total, ...props }) => {
  return (
    <Card
      className={`infobox ${active && "infobox--selected"} ${isRed &&
        "infobox--red"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color="textSecondary" className="infobox__title">
          {title}
        </Typography>
        <h2 className={`infobox__cases ${!isRed && "infobox__cases--green"}`}>
          {prettyPrintStat(cases)}
        </h2>
        <Typography className="infobox__total" color="textSecondary">
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
