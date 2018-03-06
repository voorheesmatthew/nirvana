import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null
});

const sessionReducer = (oldState = _nullUser, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user;
    default:
      return oldState;
  }
};

export default sessionReducer;