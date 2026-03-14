// eslint-disable-next-line no-unused-vars
import React from "react";
import classnames from "classnames";

const Label = ({ labelFor, label, sub_label_class }) => {
  return (
    <label
      htmlFor={labelFor}
      className={classnames(
        "gform-field-label gform-field-label--type-sub",
        sub_label_class
      )}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
};


export default Label;
