import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function UseForm(initialFValues, validateOnchange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  /* Update input value when triggered */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnchange) validate({ [name]: value });
  };

  // reset current form
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return { values, setValues, errors, setErrors, handleChange, resetForm };
}

// style the input form
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(2),
    },
  },
}));

// Registration form
export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
