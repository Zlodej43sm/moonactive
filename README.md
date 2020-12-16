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

####Promotion clone

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

####Promotion update

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

####Promotion delete

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



