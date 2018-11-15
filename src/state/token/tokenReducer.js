import types from "./types";

const initialState = {
  isTokenFetching: false,
  isTxMining: false,
  txReceipt: [],
  txError: false,
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOKEN_FETCHING:
      return {
        ...state,
        isTokenFetching: action.bool
      };
    case types.TX_MINING:
      return {
        ...state,
        isTxMining: action.bool
      };
    case types.TX_RECEIPT:
      return {
        ...state,
        txReceipt: [...state.txReceipt, action.txReceipt]
      };
    case types.TX_ERROR:
    return {
      ...state,
      txError: action.bool
    }

    default:
      return state;
  }
};
