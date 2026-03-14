import classnames from "classnames";
import React from "react";
import { valueToLowerCase, isNonEmptyObject } from "../../utils/helpers";
import { outputDescription } from "../../utils/inputSettings";
import { useSettings } from "../../providers/SettingsContext";
import { getLabelAndWrapperComponents } from "./helpers";
import classNames from "classnames";
import ErrorMessage from "../General/ErrorMessage";

const InputWrapper = ({
  children,
  errors,
  inputData: {
    description,
    descriptionPlacement,
    isRequired,
    label,
    type,
    inputs,
    choices,
    id,
    isHidden,
  },
  labelFor,
  wrapClassName,
  ginputClassName,
  wrapId,
  errorMessage,
}) => {
  const joinedLabel = `${label}${
    isRequired ? '<span className="gfield_required">*</span>' : ""
  }`;

  const { form } = useSettings();
  const { Label, Wrapper } = getLabelAndWrapperComponents(
    type,
    inputs,
    choices
  );

  const { descriptionPlacement: globalPlacement } = form || {};
  const descPlacement =
    descriptionPlacement && descriptionPlacement !== "INHERIT"
      ? descriptionPlacement
      : globalPlacement && globalPlacement !== "INHERIT"
      ? globalPlacement
      : "BELOW";

  return (
    <Wrapper
      className={classnames(
        wrapClassName,
        errors?.type && "gravityform__field--error"
      )}
      id={wrapId}
      style={isHidden ? { display: "none" } : undefined}
    >
      {labelFor && (
        <Label
          className="gfield_label gform-field-label"
          htmlFor={Label === "legend" ? undefined : labelFor}
          dangerouslySetInnerHTML={{ __html: label && joinedLabel }}
        />
      )}
      {description &&
        valueToLowerCase(descPlacement) == "above" &&
        outputDescription(description, wrapId)}

      <div
        id={classNames(Label === "legend" && `${labelFor}_container`)} // only set an id when there are child elements like options
        className={classnames(
          `ginput_container ginput_container_${valueToLowerCase(type)}`,
          ginputClassName
        )}
      >
        {children}
      </div>

      {description &&
        valueToLowerCase(descPlacement) == "below" &&
        outputDescription(description, wrapId)}

      {isNonEmptyObject(errors) && (
        <ErrorMessage
          errorMessage={errorMessage ? errorMessage : errors.message}
          id={id}
        />
      )}
    </Wrapper>
  );
};

export default InputWrapper;

