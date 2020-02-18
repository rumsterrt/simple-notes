import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import getReducers from 'reducers'

export default () => createStore(getReducers(), applyMiddleware(thunkMiddleware))
