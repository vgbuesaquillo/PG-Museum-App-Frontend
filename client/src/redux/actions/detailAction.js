import { POST_REVIEW } from '../types'
import axios from 'axios';

export function postReview(payload) {
  const url = process.env.REACT_APP_URL
  
    return async function(dispatch) {
      try {
        var review = await axios.post(`${url}/review/post`, payload);
        return dispatch({
          type: POST_REVIEW,
          payload: review.data
        });
        
      } catch(err) {
        console.log(err);
      }
    };
  }