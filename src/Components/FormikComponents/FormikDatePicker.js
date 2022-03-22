import { FC } from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import DatePicker from "@mui/lab/DatePicker";

export const FormikDatePicker = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <DatePicker
      label={props.label}
      value={field.value ?? ""}
      onChange={(e) => helpers.setValue(e)}
      mask="__.__.____"
      disabled={props.readOnly ?? false}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          value={field.value ?? ""}
          id={field.name}
          name={field.name}
          variant={props.variant ? props.variant : "outlined"}
          error={
            meta.touched && (Boolean(meta.error) || Boolean(props.apiError))
          }
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};
