import React from 'react'
import { Rating } from 'semantic-ui-react'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const RatingFive = (props) =>
  <div>
    <br />
    <Rating icon='star' defaultRating={props.rating}
      maxRating={5} size='huge' disabled />
  </div>

export default RatingFive