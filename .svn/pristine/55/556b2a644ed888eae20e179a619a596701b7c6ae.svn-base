import React, {useState, useEffect} from 'react'
import { Container, StyledCloseIcon, TextDiv, StyledButton } from './alert-container.styled'

const transitionMs = 1000

const AlertContainer = ({changeText, onAccept, onClose, setVisible}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const [transition, setTransition] = useState('')

    useEffect(() => {
        if (setVisible && !isVisible){
            setIsVisible(true)
            setTransition(`all ${transitionMs}ms ease`)
            setTimeout(() => {setOpacity(1)}, 20)
        }

        if (!setVisible && isVisible){
            setTransition('unset')
            setOpacity(0)
            setIsVisible(false)
        }
    }, [setVisible])

    return <Container thisOpacity={opacity} thisDisplay={isVisible ? 'flex' : 'none'} thisTransition={transition}>
        <StyledCloseIcon onClick={onClose} />
        <TextDiv>El cambio a <strong>{changeText}</strong> eliminará los productos del carrito. ¿Desea continuar?</TextDiv>
        <StyledButton onClick={onAccept} variant='contained'>Aceptar</StyledButton>
    </Container>
}

export default AlertContainer