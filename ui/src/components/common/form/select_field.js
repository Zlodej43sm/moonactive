// node modules
import React from "react";
import { useTranslation } from "react-i18next";

// material
import { withStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";

// local files
import styles from "./styles";

const CommonSelectField = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const {
    disabled,
    fieldSchema,
    autoFocus = false,
    onFieldChange,
    required = false,
    fieldsValuesMap
  } = props;
  const { id, name, type, options } = fieldSchema;
  const labelId = `type-label-${name}-${id}`;

  return (
    <FormControl margin="normal" required fullWidth>
      <InputLabel id={labelId}>{t(name)}</InputLabel>
      <Select
        {...{
          disabled,
          autoFocus,
          required,
          onChange: onFieldChange(id, type),
          label: t(name),
          value: fieldsValuesMap[id]
        }}
      >
        {options.map((option, i) => (
          <MenuItem value={option} key={`${id}-${option}-${i}`}>
            {t(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(CommonSelectField);
