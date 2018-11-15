import ethritageToken from "../../../build/contracts/ethritageToken.json";
import { TOKEN_FETCHING, TX_RECEIPT, TX_MINING, TX_ERROR } from "./types";

import store from "../../store";
const contract = require("truffle-contract");

let web3 = store.getState().web3.web3Instance;
const token = contract(ethritageToken);
token.setProvider(web3.currentProvider);

//-------- Actions

export const setTokenFetching = bool => {
  return {
    type: TOKEN_FETCHING,
    bool
  };
};

export const setTxReceipt = txReceipt => {
  return {
    type: TX_RECEIPT,
    txReceipt
  };
};

export const setTxMining = bool => {
  return {
    type: TX_MINING,
    bool
  };
};

export const setTxError = bool => {
  return {
    type: TX_ERROR,
    bool
  };
};

//-------- THUNKS
// export const tokenAddMinter_THUNK = minterAddress => {
//   return async dispatch => {
//     dispatch(setTokenFetching(true));
//     try {
//       const coinbase = await web3.eth.getCoinbase();
//       const tokenInstance = await token.deployed();
//       tokenInstance.addMinter(minterAddress).call({ from: coinbase });

//     } catch (error) {
//       dispatch(setTokenFetching(false));
//       dispatch(setTxError(true));
//       console.log(error);
//     }
//     dispatch(setTokenFetching(false));
//   };
// };
// export function thunkGetSingleDiscourse(discourseId) {
//   return async (dispatch) => {
//     const {discourseList, discourseIds} = store.getState().discourseReducer
//     const discourse = discourseList[discourseIds[discourseId]]
//     if (!discourse){
//       let doc = await firestore.collection('discourseList').doc(discourseId).get()
//       const id = doc._key.path.segments[doc._key.path.segments.length - 1]
//       let docData = doc.data()
//       docData = { ...docData, docId: id }
//       dispatch(setSingleDiscourse(docData))
//     } else {
//       dispatch(setSingleDiscourse(discourse));
//     }
//   };
// }
