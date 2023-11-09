import React from 'react'
import { MethodContainer, StyledTextField, TooltipTitle, Text } from './payment-amount-container.styled'
import { paymentMethods } from '../../constants'
import HtmlTooltip from '../htmlTooltip'
import amountToFixed from '../../helper/amountToFixed'

const PaymentAmountContainer = ({amount, primaryPaymentMethod, secondaryPaymentMethod, setCashValue, opentooltip, cashValue}) => {

    return <MethodContainer>
           {primaryPaymentMethod === paymentMethods.nomina ? <Text>{secondaryPaymentMethod === paymentMethods.efectivo ? 'Efectivo' : 'Tarjeta'} <strong>RD$ {amountToFixed(amount,2)}</strong></Text> : null }
           { (primaryPaymentMethod === paymentMethods.efectivo || secondaryPaymentMethod === paymentMethods.efectivo) && <>
                <HtmlTooltip arrow open={opentooltip} placement='bottom-start' title={<TooltipTitle>El monto a pagar debe ser mayor o igual que <strong>Total Efectivo</strong></TooltipTitle>}>
                    <StyledTextField opentooltip={opentooltip} value={cashValue} onChange={(e) => {setCashValue(e.target.value)}} variant="outlined" type='number' placeholder='Digitar monto recibido'
                        inputProps={{
                                style: {fontSize: 16, height:8} 
                            }}/>
                </HtmlTooltip>
                <Text>Devuelta: <strong>RD$ {amountToFixed(cashValue - amount >0 ? (cashValue - amount) : 0, 2)}</strong></Text>
           </>}
    </MethodContainer>
}

export default PaymentAmountContainer