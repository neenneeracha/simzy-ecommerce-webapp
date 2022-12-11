/********************************************************************
 *
 * Button.jsx
 *
 *    This file represents the multi-use button component with text 
 *    and allows click events.
 *
 ********************************************************************
 */

import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  label: {
    textTransform: "none",
  },
}));

const Button = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    //default button
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
