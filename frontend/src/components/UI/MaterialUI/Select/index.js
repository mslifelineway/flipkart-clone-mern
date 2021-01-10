import { FormHelperText, MenuItem, Select } from "@material-ui/core";
import React from "react";
const createOptions = (options, defaultSelect, defaultSelectValue) => {
  let optionList = [];
  optionList.push(
        <MenuItem
          id={`defaultOption0`}
          key={`defaultMenuOption0`}
          value={defaultSelectValue}
        >
          {defaultSelect}
        </MenuItem>
      );
  options.map((op, index) => {
    return optionList.push(
      <MenuItem
        id={`menuItem${index}`}
        key={op.value + "_" + index}
        value={op.value}
      >
        {op.name}
      </MenuItem>
    );
  });
  return optionList;
};

/** To show the error message below the select input,
 *  must pass the 'showError', but to hide it no need to pass this
 * props. 'showError' can be any value but better will pass
 * showError = true
 *  */
const MaterialSelect = ({
  labelId,
  id,
  value,
  onChange,
  options = [],
  defaultSelect,
  defaultSelectValue,
  error,
  showError,
}) => {
  return (
    <>
      <Select
        key={labelId}
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        displayEmpty
        error={error}
      >
        {createOptions(options, defaultSelect, defaultSelectValue)}
      </Select>
      {showError ? <FormHelperText>{error}</FormHelperText> : null}
    </>
  );
};

export default MaterialSelect;
