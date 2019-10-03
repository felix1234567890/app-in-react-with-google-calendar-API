export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = (name, image) => ({
  type: SET_USER,
  name,
  image
});
export const removeUser = () => ({
  type: REMOVE_USER
});
