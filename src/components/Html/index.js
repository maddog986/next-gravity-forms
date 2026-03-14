import classnames from "classnames";
import React from "react";
import InputWrapper from "../../components/InputWrapper";

const Html = ({ fieldData, labelFor, wrapClassName, ...wrapProps }) => {
  const { content, cssClass } = fieldData;

  return (
    <InputWrapper
      {...wrapProps}
      inputData={fieldData}
      labelFor={labelFor}
      wrapClassName={classnames(
        wrapClassName,
        "gfield_html",
        "gfield_html_formatted",
        "gfield_no_follows_desc",
        cssClass
      )}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </InputWrapper>
  );
};

export default Html;

