import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
  RadioGroup as MuiRadioGroup,
} from "@material-ui/core";

const RadioGroup = (props) => {
  const { name, label, value, error = null, onChange, items } = props;
  return (
    <FormControl>
      {
        (error !== "" && error !== null) ? 
        <FormLabel style ={{ fontSize: 14, color: "#F44336" }}>{label}</FormLabel>
        :
        <FormLabel style ={{ fontSize: 14 }}>{label}</FormLabel>
      }
      <MuiRadioGroup
        row={true}
        name={name}
        value={value}
        onChange={onChange}
      >
        {
        (error !== "" && error !== null) ? 
        <>
        {items.map((item, index) => (
          <FormControlLabel
            value={item.id}
            control={<Radio style={{ color: "#F44336" }}  />}
            label={item.title}
            key={index}
            style={{ color: "#F44336" }} 
          />
        ))}
        </>
        :
        <>
        {items.map((item, index) => (
          <FormControlLabel
            value={item.id}
            control={<Radio />}
            label={item.title}
            key={index}
          />
        ))}
        </>
      }
  
      </MuiRadioGroup>
      {
        error !== "" ? 
        <Typography style ={{ fontSize: 14, color: "#F44336" }}>{error}</Typography>
        :
        undefined
      }
    </FormControl>
  );
};

export default RadioGroup;
