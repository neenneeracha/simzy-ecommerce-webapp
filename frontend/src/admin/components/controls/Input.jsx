import React from "react";
import { TextField } from "@material-ui/core";

const Input = (props) => {
  const { name, label, value, error = null, onChange, type } = props;
  return (
    <TextField
      id={name}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type || "text"}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
