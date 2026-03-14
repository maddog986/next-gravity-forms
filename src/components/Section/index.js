import React from "react";
import classnames from "classnames";
import { outputDescription } from "../../utils/inputSettings";

const Section = ({ fieldData, wrapClassName, wrapId }) => {
  const { label, description, cssClass } = fieldData;
  return (
    <div
      className={classnames(wrapClassName, cssClass, "gsection")}
      id={wrapId}
    >
      {label && <h3 className="gsection_title">{label}</h3>}
      {description &&
        outputDescription(description, wrapId, "gsection_description")}
    </div>
  );
};

export default Section;

