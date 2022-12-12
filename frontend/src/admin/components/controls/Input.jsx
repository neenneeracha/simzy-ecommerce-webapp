/********************************************************************
 *
 * Input.jsx
 *
 *    This file represents the multi-use input Text Field component 
 *    allow user to enter and edit text
 *
 ********************************************************************
 */

import React from "react";
import { TextField } from "@material-ui/core";

const Input = (props) => {
  const { name, label, value, error = null, onChange, type, multiline } = props;
  return (
    // default settings for text input field
    <TextField
      id={name}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      multiline={multiline === true? true : false}
      type={type || "text"}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
