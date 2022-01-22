import { SORT_GALLERY } from "../types";

export function sortGallery(option) {
  return {
    type: SORT_GALLERY,
    payload: option
  }
}