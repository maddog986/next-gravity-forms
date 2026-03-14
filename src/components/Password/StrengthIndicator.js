import React from "react";
import classNames from "classnames";

const StrengthIndicator = ({ labelFor, score = "blank", strings }) => {
  return (
    <div
      id={`${labelFor}_strength_indicator`}
      className={classNames("gfield_password_strength", score)}
    >
      {strings.password.strength[score]}
    </div>
  );
};


export default StrengthIndicator;
