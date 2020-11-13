import { combineReducers } from 'redux';
import users from './users'
import auth from './auth'
import alert from './alert'

export default combineReducers({
    users, auth, alert
})