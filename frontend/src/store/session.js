import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_USER = "session/updateUser";

// action creators for login/logout
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
  });

// thunk for login
export const login = (user) => async (dispatch) => {
    try {
      const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await response.json();
      dispatch(setUser(data.user));
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

// thunk for restore session
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// thunk for logout
export const logout = () => async (dispatch) => {
  await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
};

// thunk for signup
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password, phone, address } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// thunk for updating user info
export const updateUserInfo = (userId, userInfo) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/users/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user information');
      }
  
      const data = await response.json();
      dispatch(updateUser(data.user));
      return data.user;
    } catch (error) {
      console.error('Error updating user information:', error);
      throw error;
    }
  };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
      case UPDATE_USER:
        return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default sessionReducer;
