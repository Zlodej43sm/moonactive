# Pseudo of socket usage for multiple users edit action

## Client App

```javascript
// On promotion edit dialog field changes emit fields data
const changeTimestamp = new Date().toLocaleTimeString();
const editPromotionData = {
  promotionId,
  fields: [{ fieldId, changeTimestamp }],
};
socket.emit("promotion_edit_filed_change", editPromotionData);

// Listen ongoing field update processes, storing data to redux store
socket.on({
  promotion_edit_field_disable: (data) => {
    let i = 0;

    while (i < data.length) {
      disable_dialog_field_by_id(data[i]);
      i++;
    }
  },
  promotion_edit_field_enable: (data) => {
    let i = 0;

    while (i < data.length) {
      enable_dialog_field_by_id(data[i]);
      i++;
    }
  },
});

// On promotion edit dialog close/save emit clean up data, emmit list of not disabled fields
socket.emit("promotion_edit_clean_up", { promotionId, fields: [fieldId, ..., fieldNId] });
```

## Server App

```javascript
io.sockets.on("connection", function (socket) {
  socket.editPool = {};

  // Listen opened edit dialogs fields changes
  socket.on("promotion_edit_filed_change", function (editPromotionData) {
    const { promotionId, fields } = editPromotionData;
    const isInEditPool = socket.editPool[promotionId];
    const emmitData = {
      promotionId,
      fields,
    };

    // If field in edit pool, means it exist and already edited
    if (isInEditPool) {
      let i = 0;

      while (i < fields.length) {
        const { fieldId, changeTimestamp } = fields[i];
        const { changeTimestamp: poolChangeTimestamp } = socket.editPool[promotionId][fieldId];
        // Check if field start edit time has been initially first
        const isOriginEdit = poolChangeTimestamp < changeTimestamp;

        // If field start edit time hasn't been initially first, can happen due slow internet connection or due some network issues
        if (!isOriginEdit) {
          // update target client(enable field)
          socket.emit("promotion_edit_field_enable", emmitData);
          // notify other client that filed is editing(on client disable wrong active, probably with some apologize message)
          socket.broadcast.emit("promotion_edit_field_disable", emmitData);
        }
        i++;
      }
    } else {
      // Update pool of active editing fields
      socket.editPool[promotionId] = convert_to_object_field_id_timestamp(
        fields
      ); // {fieldId: timestampValue, ..., fieldNId: timestampNValue}
      // Notify others clients that filed is editing & disable
      socket.broadcast.emit("promotion_edit_field_disable", emmitData);
    }
  });

  // Listen opened edit dialogs on save/close
  socket.on("promotion_edit_clean_up", function (editPromotionData) {
    const { promotionId, fields } = editPromotionData;
    const isInEditPool = socket.editPool[promotionId];
    const enabledFields = [];

    if (isInEditPool) {
      let i = 0;

      while (i < fields.length) {
        const { fieldId } = fields[i];
        delete socket.editPool[promotionId][fieldId];
        enabledFields.push(fieldId);
        i++;
      }

      socket.emit("promotion_edit_field_enable", enabledFields);
    }
  });
});
```



## React app

#### `/ui`


## Available Scripts

#### `.env-cmdrc` 

Setup enviroment config.

#### `npm start`

Runs the server app.

## Promotions API

### Generate

Generate promotions schema, store to MongoDB & create JSON `public/promotions.json`.

**URL**

`POST: /generate`

**Params**

```JSON
{
  "listLength": 300
}
```

**Response (status=200)**

Generate status

```JSON
{
    "message": "" 
}
```


### Promotions List pagination

Get promotions list range.

**URL**

`GET: /promotionsList`

**Params**

```JSON
{
    "from": 0,
    "itemsPerStep": 50
}
```

**Response (status=200)**

Promotions collection range

```JSON
[
    {
        "_id": "5fcaab38bf2e4bc893f33d89",
        "_order": 0,
        "promotionName": "Promotion 0",
        "type": "Basic",
        "userGroupName": "Group 14",
        "startDate": "2020-12-04T21:33:44.710Z",
        "endDate": "2020-12-04T21:33:44.710Z",
        "__v": 0
    }
]
```

### Promotion CRUD

#### Promotion clone

**URL**

`POST: /promotion`

**Params**

```JSON
{
    "id": "5fcaab38bf2e4bc893f33d89"
}
```

**Response (status=200)**

Cloned promotion model

```JSON
{
    "message": "",
    "result": {
        "_id": "5fcaab38bf2e4bc893f33d89",
        "_order": 0,
        "promotionName": "Promotion 0",
        "type": "Basic",
        "userGroupName": "Group 14",
        "startDate": "2020-12-04T21:33:44.710Z",
        "endDate": "2020-12-04T21:33:44.710Z",
        "__v": 0
    }
}
```

#### Promotion update

**URL**

`PUT: /promotion`

**Params**

```JSON
{
    "id": "5fc95aa2967783745e901cc0",
    "promotionName": "Promotion Up 7",
    "type": "Epic"
}
```

**Response (status=200)**

Updated promotion model

```JSON
{
    "message": "",
    "result": {
        "_id": "5fc95aa2967783745e901cc0",
        "_order": 0,
        "promotionName": "Promotion Up 7",
        "type": "Epic",
        "userGroupName": "Group 14",
        "startDate": "2020-12-04T21:33:44.710Z",
        "endDate": "2020-12-04T21:33:44.710Z",
        "__v": 0
    }
}
```

#### Promotion delete

**URL**

`DELETE: /promotion`

**Params**

```JSON
{
    "id": "5fc95aa2967783745e901cc0"
}
```

**Response (status=200)**

Deleted promotion model

```JSON
{
    "message": "",
    "result": {
        "_id": "5fc95aa2967783745e901cc0",
        "_order": 0,
        "promotionName": "Promotion Up 7",
        "type": "Epic",
        "userGroupName": "Group 14",
        "startDate": "2020-12-04T21:33:44.710Z",
        "endDate": "2020-12-04T21:33:44.710Z",
        "__v": 0
    }
}
```



