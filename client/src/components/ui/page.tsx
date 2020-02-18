import React from 'react'

import AppBar from '@material-ui/core/AppBar'

interface PageProps {
    header: React.Component
    children: React.ReactChildren
}

const Page: React.FC<PageProps> = ({ header, children }) => {
    return (
        <>
            {header && <AppBar position="sticky">{header}</AppBar>}
            {children}
        </>
    )
}

export default Page
