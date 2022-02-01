import { POST_REVIEW } from '../types'
import axios from 'axios';

export function postReview(payload) {
    return async function(dispatch) {
      try {
        var review = await axios.post("http://localhost:5040/review/post", payload);
        console.log("review", review);
        return dispatch({
          type: POST_REVIEW,
          payload: review.data
        });
        
      } catch(err) {
        console.log(err);
      }
    };
  }