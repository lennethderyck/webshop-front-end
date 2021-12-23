import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  GET_ALL_USERS_REQUEST,
  USER_ADD_USER,
  USER_GET_FAIL
} from "../constants/userConstants";
import * as userApi from '../api/users';

/*const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    localStorage.setItemset('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}*/
const getAllUsers = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_USERS_REQUEST
  });
  try {
    const data = await userApi.allUsers();
    dispatch({
      type: USER_ADD_USER,
      payload: data
    });
    const {
      users: {
        allUsers
      }
    } = getState();
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  } catch (error) {
    dispatch({
      type: USER_GET_FAIL,
      payload: "Can't get all ths users"
    });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: {
      email,
      password
    }
  });
  try {
    const data = await userApi.login(email, password);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem('auth_token', data.token);
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: 'The given email and password do not match'
    });
  }
}


const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: {
      name,
      email,
      password
    }
  });
  try {
    const data = await userApi.register(name, email, password);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem('auth_token', data.token);
  } catch (error) {
    if (password.length < 8) {
      console.log(password.length);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: 'The password should have more than 8 characters'
      });
    }
  }
}

const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("allUsers");
  dispatch({
    type: USER_LOGOUT
  })
}
export {
  signin,
  register,
  logout,
  getAllUsers
};