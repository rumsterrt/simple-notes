import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginPage, RegisterPage } from 'components/pages'
import { useSelector } from 'react-redux'
import _get from 'lodash/get'

import Container from '@material-ui/core/Container'

const Routes: React.FC = () => {
    const isAuth = useSelector(state => _get(state, 'auth.token', false))

    return (
        <Container>
            {!isAuth ? (
                <Switch>
                    <Route path="/login" render={() => <LoginPage />} />
                    <Route path="/register" render={() => <RegisterPage />} />
                    <Redirect to="/login" />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/" render={() => <div>AUTH</div>} />
                </Switch>
            )}
        </Container>
    )
}

export default Routes
