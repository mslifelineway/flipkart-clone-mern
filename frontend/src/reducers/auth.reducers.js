import { authActionTypes } from "../actions/action-types";

const initialState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: ''
  },
  authenticate: false,
  authenticating: false,
  error: null,
  message: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      }
      break;
    case authActionTypes.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
      }
      break;
      
    case authActionTypes.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break;
      case authActionTypes.LOGOUT_SUCCESS:
      state = {
        ...initialState
      }
      break;
      case authActionTypes.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
      }
      break;
    case authActionTypes.REGISTER_REQUEST:
      state = {
        loading: true,
        error: null,
        message: null,
      }
      break;
    case authActionTypes.REGISTER_SUCCESS:
      state = {
        loading: false,
        message: action.payload.message,
      }
      break;
    // case authActionTypes.REGISTER_FAILURE:
    //   state = {
    //     loading: false,
    //     error: action.payload.error,
    //     message: action.payload.message,
    //   }
    //   break;
      default:
        break;
  }

  return state;
};
export default authReducer;