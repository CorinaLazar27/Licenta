import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useField } from "formik";

export const FormikCheckBox = (props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.value}
          style={{ paddingLeft: "15px" }}
          disabled={props.disabled}
          onChange={(e) => {
            helpers.setValue(e.target.checked);
          }}
        />
      }
      label={props.label ?? ""}
    />
  );
};
