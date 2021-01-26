import { CLEAR_USER_DATA, SET_USER_DATA } from '../actionTypes';

export const SetUserData = (data) => {
  return {
    type: SET_USER_DATA,
    payload: {
      ...data
    }
  }
}

export const ClearUserData = () => {
  return {
    type: CLEAR_USER_DATA,
  }
}