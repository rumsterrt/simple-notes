import React from 'react'
import { Provider } from 'react-redux'
import getStore from 'store'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

const store = getStore()

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}

export default App
