import { CLEAR_USER_DATA, SET_USER_DATA } from "../actionTypes";

const initialState = {
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    }
    case CLEAR_USER_DATA: {
      return {
        ...state,
        user: {}
      };
    }
    default:
      return state;
  }
}
