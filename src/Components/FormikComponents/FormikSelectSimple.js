import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";

export const FormikSelectSimple = ({ items, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      select
      name={field.name}
      label={props.label}
      value={field.value ?? ""}
      onChange={field.onChange}
      error={meta.touched && (Boolean(meta.error) || Boolean(props.apiError))}
      helperText={meta.touched && meta.error}
      fullWidth
      size={props.size ?? "medium"}
      variant={props.variant ? props.variant : "outlined"}
      InputProps={{
        disabled: props.readOnly ?? false,
      }}
    >
      {items.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};
