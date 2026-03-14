import React from "react";
import classNames from "classnames";

const RulesMessages = ({ isGFValidationError, databaseId, id, children }) => {
  return (
    <span
      className={classNames(
        isGFValidationError && "gform_hidden",
        "gfield_description gform_fileupload_rules"
      )}
      id={`gfield_upload_rules_${databaseId}_${id}`}
    >
      {children}
    </span>
  );
};


export default RulesMessages;
