import { RESET_PASSWORD_POST } from "../types"

const initialState = {
    userId: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_PASSWORD_POST:
            return {
                ...state,
                userId: action.payload
            }

        default:
            return state
    }
}