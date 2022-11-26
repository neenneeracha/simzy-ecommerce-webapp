import React from "react";
import { TextField } from "@material-ui/core";

const Input = (props) => {
  const { name, label, value, error = null, onChange } = props;
  return (
    <TextField
      id="standard-basic"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && {error:true,helperText:error})}
    />
  );
};

export default Input;
