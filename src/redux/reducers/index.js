import {combineReducers} from 'redux';
import authReducer from 'src/redux/reducers/auth';
import userDataReducers from 'src/redux/reducers/users';
import transferReducer from 'src/redux/reducers/transfer';
import {ACTION_STRING} from 'src/redux/actions/actionsString';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
  auth: authReducer,
  users: userDataReducers,
  transfer: transferReducer,
});
const rootReducer = (state, action) => {
  if (action.type === ACTION_STRING.authLogout) {
    storage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
