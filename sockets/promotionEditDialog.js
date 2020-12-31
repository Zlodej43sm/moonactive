const {
  SOCKET_DIALOG_ON_EDIT_FIELD,
  SOCKET_DIALOG_DISABLE_FIELDS,
  SOCKET_DIALOG_OPENED,
  SOCKET_DIALOG_CLOSED
} = require("./constants");

const editPool = {};
const promotionEditDialog = (socket) => {
  socket.on(SOCKET_DIALOG_OPENED, (data) => {
    const { promotionId, openedAt: targetOpenedAt } = data;
    const promotionEditDataPool = editPool[promotionId];

    if (!!promotionEditDataPool) {
      socket.broadcast.emit(SOCKET_DIALOG_DISABLE_FIELDS, editPool);
    } else {
      editPool[promotionId] = data;
    }
  });
  socket.on(SOCKET_DIALOG_ON_EDIT_FIELD, (data) => {
    const { promotionId, field } = data;
    const { fields } = editPool[promotionId];

    if (fields.length) {
      updatedFields = fields.map((poolField) => {
        const shouldBeUpdated = poolField.id === field.id && field.changeTimestamp <= poolField.changeTimestamp;
        return shouldBeUpdated ? field : poolField;
      });
    } else {
      fields.push(field)
    }
    socket.volatile.broadcast.emit(SOCKET_DIALOG_DISABLE_FIELDS, editPool);
  });
  socket.on(SOCKET_DIALOG_CLOSED, (data) => {
    const { promotionId, openedAt: targetOpenedAt } = data;
    const promotionEditDataPool = editPool[promotionId];
    const { openedAt } = promotionEditDataPool;

    if (targetOpenedAt <= openedAt) {
      delete editPool[promotionId];
      console.log(editPool)
    }
    socket.broadcast.emit(SOCKET_DIALOG_DISABLE_FIELDS, promotionEditDataPool);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected", editPool);
  });
};

module.exports = promotionEditDialog;
