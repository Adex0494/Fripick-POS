import React from 'react'
import { Container, Text, ButtonsContainer, TooltipTitle } from './cash-card-selector.styled'
import RoundedButton from '../rounded-button'
import { paymentMethods } from '../../constants'
import PaymentAmountContainer from '../payment-amount-container'
import HtmlTooltip from '../htmlTooltip'

const CashCardSelector = ({primaryPaymentMethod, setSecondaryPaymentMethod, selectedSecondaryPaymentMethod, amount, openPaymentMethodTooltip, openCashTooltip, cashValue, setCashValue}) => {

    return <HtmlTooltip arrow open={openPaymentMethodTooltip} placement='bottom-start' title={<TooltipTitle>Seleccione el método de pago</TooltipTitle>}>
                <Container>
                    <Text>Elija un método de pago:</Text>
                    <ButtonsContainer>
                        <RoundedButton onClickHandler={() => setSecondaryPaymentMethod(paymentMethods.efectivo)} backgroundcolor={selectedSecondaryPaymentMethod === paymentMethods.efectivo ? '#6ec4e8' : '#c8c8c8'} text='Efectivo'/>
                        <RoundedButton onClickHandler={() => setSecondaryPaymentMethod(paymentMethods.tarjeta)} backgroundcolor={selectedSecondaryPaymentMethod === paymentMethods.tarjeta ? '#6ec4e8' : '#c8c8c8'} text='Tarjeta'/>
                    </ButtonsContainer>
                    {selectedSecondaryPaymentMethod && <PaymentAmountContainer amount={amount} primaryPaymentMethod={primaryPaymentMethod} secondaryPaymentMethod={selectedSecondaryPaymentMethod} 
                    setCashValue={setCashValue} opentooltip={openCashTooltip} cashValue={cashValue}/>
                    }
                </Container>
    </HtmlTooltip>
}

export default CashCardSelector