import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from 'actions/auth'
import _get from 'lodash/get'
import { Loader } from 'components/ui'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const Register: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [formData, setFormData] = React.useState<{ email: string; password: string; repeatPassword: string }>({
        email: '',
        password: '',
        repeatPassword: '',
    })
    const [errors, setErrors] = React.useState<{ email?: boolean; password?: boolean; repeatPassword?: boolean }>({})
    const { error: serverError, isFetching } = useSelector(state => _get(state, 'auth', {}))

    const handleField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const validate = () => {
        const newErrors: any = {}
        if (!formData.email) newErrors['email'] = true
        if (!formData.password) newErrors['password'] = true
        if (!formData.repeatPassword || formData.repeatPassword !== formData.password)
            newErrors['repeatPassword'] = true
        setErrors(newErrors)
        return _isEmpty(newErrors)
    }

    const handleSubmit = () => {
        if (!validate()) {
            return
        }
        console.log('form', formData)
        dispatch(register(formData))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleField}
                        value={formData.email}
                        error={errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleField}
                        value={formData.password}
                        error={errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Repeat password"
                        type="password"
                        id="repeatPassword"
                        onChange={handleField}
                        value={formData.repeatPassword}
                        error={errors.repeatPassword}
                    />
                    {serverError && (
                        <Typography color="error" variant="body1">
                            {serverError}
                        </Typography>
                    )}
                    {isFetching && <Loader type="block" />}
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login">{'Already have an account?'}</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Register
