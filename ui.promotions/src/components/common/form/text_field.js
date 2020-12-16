// node modules
import React from "react";
import { useTranslation } from "react-i18next";

// material
import { withStyles } from "@material-ui/core/styles";
import { FormControl, TextField } from "@material-ui/core";

// local files
import styles from "./styles";

const CommonTextField = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const {
    fieldSchema,
    autoFocus = false,
    onFieldChange,
    required = false,
    fieldsValuesMap
  } = props;
  const { id, name, type } = fieldSchema;

  return (
    <FormControl margin="normal" required fullWidth>
      <TextField
        {...{
          required,
          autoFocus,
          onChange: onFieldChange(id, type),
          label: t(name),
          defaultValue: fieldsValuesMap[id]
        }}
      />
    </FormControl>
  );
};

export default withStyles(styles)(CommonTextField);
