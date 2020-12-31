// node modules
import React from "react";
import { useTranslation } from "react-i18next";
import MomentUtils from "@date-io/moment";

// material
import { withStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

// local files
import { BASE_DATE_FORMAT } from "components/common/constants";
import styles from "./styles";

const CommonDateField = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const {
    disabled,
    fieldSchema,
    autoFocus = false,
    onFieldChange,
    required = false,
    fieldsValuesMap
  } = props;
  const { id, name, type } = fieldSchema;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        autoOk
        fullWidth
        margin="normal"
        {...{
          disabled,
          required,
          autoFocus,
          format: BASE_DATE_FORMAT,
          onChange: onFieldChange(id, type),
          label: t(name),
          value: fieldsValuesMap[id]
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(CommonDateField);
