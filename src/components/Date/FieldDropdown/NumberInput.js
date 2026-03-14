import React, { forwardRef } from "react";
import { SubLabelWrapper } from "../../General";

const NumberInput = forwardRef(
  (
    {
      selectedValue,
      startNumber,
      endNumber,
      isRequired,
      id,
      label,
      customLabel,
      name,
      subLabelPlacement,
      fieldName,
      placeholder,
      onChange,
    },
    ref
  ) => {
    return (
      <SubLabelWrapper
        subLabelPlacement={subLabelPlacement}
        className={`gfield_date_${fieldName} ginput_container ginput_container_date gform-grid-col`}
        name={id}
        label={customLabel || label}
        as="div"
        labelFor={id}
      >
        <input
          defaultValue={selectedValue && parseInt(selectedValue, 10)}
          aria-required={isRequired}
          step={1}
          min={startNumber}
          max={endNumber}
          type="number"
          id={id}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          ref={ref}
        />
      </SubLabelWrapper>
    );
  }
);

NumberInput.displayName = "NumberInput";


export default NumberInput;
