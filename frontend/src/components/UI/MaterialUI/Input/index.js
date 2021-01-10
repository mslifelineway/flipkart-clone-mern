import { FormHelperText, Input, TextField } from "@material-ui/core";
import React from "react";

/** To show the error message below the input,
 *  must pass the 'showError', but to hide it no need to pass this
 * props. 'showError' can be any value but better will pass
 * showError = true
 *  */
const MaterialInput = ({
  labelName,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
  showError,
}) => {
  return (
    <>
      <TextField
        id={labelName}
        autoComplete="current-password"
        label={labelName}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={errorMessage === "" ? false : true}
      />
      {/* <Input
        key={labelName}
        label={labelName}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={errorMessage === "" ? false : true}
      /> */}
      {showError ? <FormHelperText>{errorMessage}</FormHelperText> : null}
    </>
  );
};

export default MaterialInput;
