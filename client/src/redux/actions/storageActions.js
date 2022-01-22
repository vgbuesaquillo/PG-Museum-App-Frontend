import { LOCALSTORAGE } from "../types"

export function localstorage(storage) {
  return {
    type: LOCALSTORAGE,
    payload: storage
  }
}