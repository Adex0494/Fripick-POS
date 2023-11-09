import React from 'react'
import { Container, Typography } from './empty-state-message.styled'

const EmptyStateMessage = ({message}) => {
    return <Container>
        <Typography>{message}</Typography>
    </Container>
}

export default EmptyStateMessage