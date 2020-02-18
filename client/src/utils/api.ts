import axios from 'axios'
import url from 'url'
import _get from 'lodash/get'

export enum API_METHODS {
    API_CALL = 'API_CALL',
    API_CREATE = 'POST',
    API_READ = 'GET',
    API_UPDATE = 'PUT',
    API_DELETE = 'DELETE',
}

export enum API_STATUS {
    NO_CONTENT = 204,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    BAD_REQUEST = 400,
    SUCCESS = 200,
}

interface RequestParams {
    endpoint: string
    method: API_METHODS
    body: object
    credentials: object
    initHeaders: object
}

export const sendRequest: Function = ({ endpoint, method, body, credentials, initHeaders = {} }: RequestParams) => {
    const fullUrl = url.format({
        pathname: endpoint,
    })
    const headers: any = { ...initHeaders }

    let serializedBody = body

    // eslint-disable-next-line
    if (body instanceof FormData === false) {
        serializedBody = body || undefined

        headers['Content-Type'] = 'application/json'
    }

    const token = localStorage.getItem('jwt_token')

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    let preparedData: any = {
        method,
        url: fullUrl,
        credentials,
        headers,
    }

    if (method === API_METHODS.API_READ) {
        preparedData.params = { ...serializedBody }
    } else {
        preparedData.data = { ...serializedBody }
    }
    console.log('preparedData', preparedData)
    return axios(preparedData)
        .then(response => {
            if (response.status !== API_STATUS.SUCCESS) {
                // eslint-disable-next-line
                return Promise.reject({ ...response })
            }

            return {
                headers: response.headers,
                data: response.data,
                status: response.status,
            }
        })
        .then(
            response => ({ ...response }),
            error => {
                const { response = {} } = error || {}

                if (response.status === API_STATUS.UNAUTHORIZED) {
                    localStorage.removeItem('jwt_token')
                    window.location.reload(true)
                }

                const message = error
                    ? _get(error, 'response.data.error.message', error.message || error)
                    : 'Unknown error'

                return {
                    error: message,
                    response: error.data || {},
                }
            },
        )
}
