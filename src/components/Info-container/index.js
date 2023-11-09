import React from 'react'
import { Container, InfoText } from './info-container.styled'
import amountToFixed from '../../helper/amountToFixed'

const InfoContainer = ({cashOrCardValue}) => {
    return <Container>
    <InfoText>
        El cliente no posee monto suficiente para cubrir el total de la orden. Debe pagar <strong>{`RD$ ${amountToFixed(cashOrCardValue,2)}`}</strong> utilizando otro método de pago a continuación.
    </InfoText>
</Container>
}

export default InfoContainer