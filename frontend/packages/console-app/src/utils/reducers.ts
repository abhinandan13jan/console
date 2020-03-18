import { combineReducers } from 'redux';
import terminalReducer from '../components/cloud-shell/redux/reducer';

export default combineReducers({
  terminal: terminalReducer,
});
