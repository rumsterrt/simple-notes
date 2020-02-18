import React from 'react'

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

interface LoaderProps {
    type?: 'inline' | 'fullScreen' | 'block'
}

const Loader = ({ type = 'fullScreen', ...rest }: LoaderProps) => {
    const classes = useStyles()

    switch (type) {
        case 'inline':
            return <CircularProgress color="inherit" {...rest} />

        case 'block':
            return (
                <Box width="100%" display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress color="inherit" {...rest} />
                </Box>
            )

        case 'fullScreen':
        default:
            return (
                <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" {...rest} />
                </Backdrop>
            )
    }
}

export default Loader
