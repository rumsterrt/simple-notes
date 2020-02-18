import { sendRequest, API_METHODS } from 'utils/api'

const NS = '@todoList/auth'

export const actionTypes = {
    LOGIN_REQUEST: `${NS}/LOGIN_REQUEST`,
    LOGIN_SUCCESS: `${NS}/LOGIN_SUCCESS`,
    LOGIN_FAILURE: `${NS}/LOGIN_FAILURE`,

    REGISTER_REQUEST: `${NS}/REGISTER_REQUEST`,
    REGISTER_SUCCESS: `${NS}/REGISTER_SUCCESS`,
    REGISTER_FAILURE: `${NS}/REGISTER_FAILURE`,

    LOGOUT: `${NS}/LOGOUT`,
}

export const login = ({ email, password }: { email: string; password: string }) => (dispatch: Function) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST })

    return sendRequest({
        endpoint: '/api/auth/login',
        method: API_METHODS.API_CREATE,
        body: { email, password },
    }).then(({ data, error }: any) => {
        console.log('error', error)
        if (error) {
            return dispatch({ type: actionTypes.LOGIN_FAILURE, error })
        }

        localStorage.setItem('jwt_token', data.token)
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data })
    })
}

export const register = ({ email, password }: { email: string; password: string }) => (dispatch: Function) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST })

    return sendRequest({
        endpoint: '/api/auth/register',
        method: API_METHODS.API_CREATE,
        body: { email, password },
    }).then(({ error }: any) => {
        if (error) {
            return dispatch({ type: actionTypes.REGISTER_FAILURE, error })
        }

        dispatch({ type: actionTypes.REGISTER_SUCCESS })
    })
}

export const logout = () => (dispatch: Function) => {
    localStorage.removeItem('jwt_token')
    dispatch({ type: actionTypes.LOGOUT })
}
