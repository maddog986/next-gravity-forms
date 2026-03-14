import React from "react";
import Percentage from "./Percentage";
import Steps from "./Steps";

const ProgressBar = ({ type, ...props }) => {
  if (type === "PERCENTAGE") {
    return <Percentage {...props} />;
  }

  return <Steps {...props} />;
};


export default ProgressBar;
