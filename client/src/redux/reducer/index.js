import { POST_USER } from "../actions";

const initialState = {
    user: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case POST_USER:
            return {
                ...state,
                user: [...state.user, action.payload]
            }



        default:
            return state;
    }
}