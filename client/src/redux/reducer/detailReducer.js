import { POST_REVIEW } from '../types'

const initialState = {
  allreview: [],
}

export default function allReview(state = initialState, action) {
  switch (action.type) {
    case POST_REVIEW:
      return {
        ...state,
        allreview: action.payload
      }
    default:
      return state
  }
}