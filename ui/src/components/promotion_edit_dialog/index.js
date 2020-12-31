// node modules
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// material
import { withStyles } from "@material-ui/core/styles";

// local components
import CommonDialog from "components/common/dialog";
import CommonTextField from "components/common/form/text_field";
import CommonSelectField from "components/common/form/select_field";
import CommonDateField from "components/common/form/date_field";

// local files
import { promotionEditApi } from "api";
import { EDIT_PROMOTION } from "store/types";
import { field_types } from "components/common/constants";
import { generateOptionsObject } from "components/common/utils";
import {
  SOCKET_DIALOG_ON_EDIT_FIELD,
  SOCKET_DIALOG_DISABLE_FIELDS,
  SOCKET_DIALOG_OPENED,
  SOCKET_DIALOG_CLOSED
} from "./constants";
import { getTimestamp } from "./utils";
import styles from "./styles";

const PromotionEditDialog = ({ classes, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { socket, promotion, promotionSchema, toggleOpened } = props;
  const [fieldsValuesMap, setFieldsValuesMap] = useState(promotion);
  const [disabledFieldsList, setDisabledFieldsList] = useState(null);
  const editPromotionData = {
    promotionId: fieldsValuesMap._id,
    openedAt: getTimestamp(),
    fields: []
  };
  const onClose = () => {
    toggleOpened(null);
    socket.emit(SOCKET_DIALOG_CLOSED, { promotionId: promotion._id });
  };
  const onSave = (event) => {
    const options = generateOptionsObject({
      body: { ...fieldsValuesMap, id: fieldsValuesMap._id },
      loadingMsg: "Saving promotion",
      type: EDIT_PROMOTION,
      dispatch
    });
    const apiPromise = promotionEditApi(options);
    dispatch(apiPromise);
    onClose();
    event.preventDefault();
  };
  const onFieldChange = (id, type) => (event) => {
    const updatedFieldValue =
      type === field_types.DATE ? event : event.target.value;
    const newValues = { ...fieldsValuesMap, ...{ [id]: updatedFieldValue } };
    const field = {
      id,
      changeTimestamp: getTimestamp(),
      value: updatedFieldValue
    };
    const { promotionId } = editPromotionData;

    socket.emit(SOCKET_DIALOG_ON_EDIT_FIELD, { promotionId, field });
    setFieldsValuesMap(newValues);
  };
  const generateFieldsComponentsMap = (fieldSchema, i) => {
    const autoFocus = i === 0;
    const { id, name, type } = fieldSchema;
    const uId = `edit-dialog-${name}-${id}`;
    let FieldComponent = null;
    const disabled = disabledFieldsList
      ? disabledFieldsList.some(
          (disabledField) => disabledField.id === fieldSchema.id
        )
      : false;

    switch (type) {
      case field_types.TEXT:
        FieldComponent = (
          <CommonTextField
            {...{
              disabled,
              fieldSchema,
              autoFocus,
              onFieldChange,
              fieldsValuesMap
            }}
            key={uId}
          />
        );
        break;
      case field_types.SELECT:
        FieldComponent = (
          <CommonSelectField
            {...{
              disabled,
              fieldSchema,
              autoFocus,
              onFieldChange,
              fieldsValuesMap
            }}
            key={uId}
          />
        );
        break;
      case field_types.DATE:
        FieldComponent = (
          <CommonDateField
            {...{
              disabled,
              fieldSchema,
              autoFocus,
              onFieldChange,
              fieldsValuesMap
            }}
            key={uId}
          />
        );
        break;
      default:
        throw new Error(`Field - ${type} not defined`);
    }

    return FieldComponent;
  };
  useEffect(() => {
    socket.emit(SOCKET_DIALOG_OPENED, editPromotionData);
    socket.on(SOCKET_DIALOG_DISABLE_FIELDS, (data) => {
      const disabledList = data[editPromotionData.promotionId];
      if (disabledList) {
        setDisabledFieldsList(disabledList.fields);
      }
    });
    return () => socket.off(SOCKET_DIALOG_DISABLE_FIELDS);
  }, [socket, editPromotionData]);

  return (
    <CommonDialog
      {...{
        title: t("Edit promotion"),
        open: true,
        onClose,
        onSave
      }}
    >
      {promotionSchema.map(generateFieldsComponentsMap)}
    </CommonDialog>
  );
};

export default withStyles(styles)(PromotionEditDialog);
