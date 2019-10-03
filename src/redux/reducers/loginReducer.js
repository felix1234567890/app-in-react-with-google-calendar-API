import { SET_USER, REMOVE_USER } from '../actions/loginActions';

const initialState = {
  isAuth: false,
  name: '',
  imageUrl: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        name: action.name,
        imageUrl: action.image
      };
    case REMOVE_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
