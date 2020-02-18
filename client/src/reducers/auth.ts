import { actionTypes } from 'actions/auth'
import _get from 'lodash/get'

const token = localStorage.getItem('jwt_token')

const getInitState = () => ({
    token,
    isFetching: false,
    error: null,
})

export default (state = getInitState(), action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return { ...state, isFetching: true, error: null }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                token: _get(action, 'payload.token'),
            }
        case actionTypes.LOGIN_FAILURE:
            return { ...state, isFetching: false, error: action.error }

        case actionTypes.REGISTER_REQUEST:
            return { ...state, isFetching: true, error: null }
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
            }
        case actionTypes.REGISTER_FAILURE:
            return { ...state, isFetching: false, error: action.error }
        case actionTypes.LOGOUT:
            return { ...state, token: null, error: null }
        default:
            return state
    }
}
