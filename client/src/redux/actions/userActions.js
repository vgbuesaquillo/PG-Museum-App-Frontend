import axios from 'axios';
import { RESET_PASSWORD_POST } from "../types"

export function resetPasswordPost(email) {
    return async function dispatch(dispatch) {
        let response = await axios.post(`http://localhost:5040/users/resetPasswordPost`, email);
        const json = await response.data;
        dispatch({
            type: RESET_PASSWORD_POST,
            payload: json
        });
    }
}


