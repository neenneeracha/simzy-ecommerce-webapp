import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "25ch",
  },
}));

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;
  const classes = useStyles();

  return (
    <FormControl {...(error && { error: true })} className={classes.root}>
      {
        label === "Category" ? 
        <>
        <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.category_id} value={item.category_id}>
            {item.main_category} - {item.sub_category}
          </MenuItem>
        ))}
      </MuiSelect>
        </> : 
        label === "Color group - Color" ? 
        <>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.color_group_id} value={item.color_group_id}>
            {item.color_group} - {item.color}
          </MenuItem>
        ))}
      </MuiSelect>
        </>
        :
        <>
        <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
        </>
      }
      {error && <FormHelperText>{error}</FormHelperText>}      
    </FormControl>
  );
}
