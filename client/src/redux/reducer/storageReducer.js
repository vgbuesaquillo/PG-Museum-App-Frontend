import { LOCALSTORAGE } from "../types";

const initialState = {
  storage: []
}

export default function storageReducer(state = initialState, action) {
  switch (action.type) {
    case LOCALSTORAGE:
      return {
        ...state,
        storage: action.payload
      }

    default:
      return state
  }
}