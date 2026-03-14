import React, { useState } from "react";
import classnames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import { valueToLowerCase } from "../../utils/helpers";
import InputWrapper from "../InputWrapper";
import { Input } from "../General";
import { useSettings } from "../../providers/SettingsContext";
import { InputMask, format, generatePattern } from "@react-input/mask";

const mask = {
  mask: "(___) ___-____",
  replacement: { _: /\d/ },
};

export const formatValue = (value) => {
  const pattern = generatePattern(mask);

  const val = format(value, mask);

  // default value can be only set when value is complete and matches pattern
  if (new RegExp(pattern).test(val)) {
    return val;
  }

  return "";
};

const PhoneField = ({ fieldData, name, labelFor, ...wrapProps }) => {
  const { strings } = useSettings();
  const { phoneFormat, isRequired, size, errorMessage, autoComplete } =
    fieldData;

  const isStandard = "standard" === valueToLowerCase(phoneFormat);

  const phoneErrorMessage =
    errorMessage || strings.errors.pattern.phone;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const describedBy = `gfield_description_${labelFor?.replace("name_", "")}`;

  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={labelFor}
      {...wrapProps}
    >
      <Controller
        name={name}
        defaultValue=""
        control={control}
        render={({ field: { value, ref, ...rest } }) => {
          const [showMask, setShowMask] = useState(false);

          return (
            <>
              {isStandard ? (
                <InputMask
                  className={classnames(valueToLowerCase(size))}
                  id={labelFor}
                  ref={ref}
                  name={name}
                  aria-invalid={Boolean(errors?.[name])}
                  aria-required={isRequired}
                  aria-describedby={describedBy}
                  type="text"
                  {...mask}
                  showMask={showMask}
                  value={value}
                  autoComplete={autoComplete}
                  {...rest}
                  onFocus={() => setShowMask(true)}
                  onBlur={() => setShowMask(false)}
                />
              ) : (
                <Input
                  fieldData={{ ...fieldData, type: "tel" }}
                  className={classnames(valueToLowerCase(size))}
                  defaultValue={value}
                  errors={errors}
                  labelFor={labelFor}
                  ref={ref}
                  {...rest}
                />
              )}
            </>
          );
        }}
        rules={{
          required: isRequired && (errorMessage || strings.errors.required),
          validate: (value) => {
            if (!value) return true;
            if (isStandard) {
              // Standard US format: must match (XXX) XXX-XXXX completely
              const pattern = generatePattern(mask);
              if (!new RegExp(pattern).test(value)) {
                return phoneErrorMessage;
              }
            } else {
              // International: must contain at least 7 digits
              const digits = value.replace(/\D/g, "");
              if (digits.length < 7) {
                return phoneErrorMessage;
              }
            }
            return true;
          },
        }}
      />
    </InputWrapper>
  );
};

export default PhoneField;

