// Promotions config
import {
  itemsPerPage,
  itemsPerStep,
  initialListLength,
  promotionSchema
} from "promotionsSettingsConfig";

// node modules
import { createReducer } from "@reduxjs/toolkit";

// local files
import {
  SET_PROMOTIONS_LIST,
  LOAD_PREV_PROMOTIONS_LIST,
  LOAD_NEXT_PROMOTIONS_LIST,
  ERASE_PROMOTIONS_LIST,
  DUPLICATE_PROMOTION,
  EDIT_PROMOTION,
  DELETE_PROMOTION
} from "store/types";

const initialState = {
  from: 0,
  to: itemsPerPage,
  itemsPerStep,
  initialListLength,
  itemsPerPage,
  promotionSchema,
  rows: []
};

export const promotionsList = createReducer(initialState, {
  [SET_PROMOTIONS_LIST]: (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  },
  [LOAD_PREV_PROMOTIONS_LIST]: (state, action) => {
    const { rows: stateRows, from, to } = state;
    const {
      payload: { rows }
    } = action;
    let updatedFrom = from - itemsPerStep;
    let updatedTo = to - itemsPerStep;
    let updatedRows = [...rows, ...stateRows];
    updatedRows = updatedRows.slice(0, itemsPerPage).reduce(
      (acc, row) => {
        const { keyMap, uniqRows } = acc;
        const isDuplicated = keyMap[row._id];

        if (!isDuplicated) {
          keyMap[row._id] = row;
          uniqRows.push(row);
        }

        return acc;
      },
      {
        keyMap: {},
        uniqRows: []
      }
    ).uniqRows;

    return { ...state, from: updatedFrom, to: updatedTo, rows: updatedRows };
  },
  [LOAD_NEXT_PROMOTIONS_LIST]: (state, action) => {
    const { rows: stateRows, from, to } = state;
    const {
      payload: { rows }
    } = action;
    let updatedRows = [...stateRows, ...rows];
    let updatedFrom = from;
    let updatedTo = to;

    if (rows.length) {
      updatedTo += itemsPerStep;
      updatedFrom += itemsPerStep;
      updatedRows = updatedRows.slice(itemsPerStep).reduce(
        (acc, row) => {
          const { keyMap, uniqRows } = acc;
          const isDuplicated = keyMap[row._id];

          if (!isDuplicated) {
            keyMap[row._id] = row;
            uniqRows.push(row);
          }

          return acc;
        },
        {
          keyMap: {},
          uniqRows: []
        }
      ).uniqRows;
    }

    return { ...state, from: updatedFrom, to: updatedTo, rows: updatedRows };
  },
  [DUPLICATE_PROMOTION]: (state, action) => {
    const { rows: stateRows } = state;
    const {
      payload: { row }
    } = action;
    const updatedRows = stateRows.concat(row);

    updatedRows.sort((a, b) => {
      if (a._order > b._order) {
        return 1;
      }
      if (a._order < b._order) {
        return -1;
      }
      return 0;
    });
    return { ...state, rows: updatedRows };
  },
  [EDIT_PROMOTION]: (state, action) => {
    const {
      payload: { row }
    } = action;
    const updatedRows = state.rows.map((stateRow) => {
      const isEditRow = stateRow._id === row._id;
      return isEditRow ? { ...stateRow, ...row } : stateRow;
    });

    return { ...state, rows: updatedRows };
  },
  [DELETE_PROMOTION]: (state, action) => {
    const { rows: stateRows } = state;
    const {
      payload: { row }
    } = action;
    const updatedRows = stateRows.filter(
      (stateRow) => stateRow._id !== row._id
    );

    return { ...state, rows: updatedRows };
  },
  [ERASE_PROMOTIONS_LIST]: () => initialState
});
