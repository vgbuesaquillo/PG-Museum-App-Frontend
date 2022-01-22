import { SORT_GALLERY } from "../types";

const initialState = {
  option: ""
}

export default function sortReducer(state = initialState, action) {
  switch (action.type) {
    case SORT_GALLERY:
      console.log(action)
      return {
        ...state,
        option: action.payload
      }
    default:
      return state
  }
}