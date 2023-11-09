import React from 'react'  
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'; 
import IconButton from '@mui/material/IconButton';
import { Container, ButtonsContainer, WarningIcon, FlexContainer, TooltipTitle } from './payment-method.styled'
import RoundedButton from '../rounded-button';
import { styled } from '@mui/material/styles';
import { paymentMethods } from '../../constants';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      height:'50px',
      width: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#f5f5f9',
        "&:before": {
            border: `2px solid rgb(231, 231, 231)`
          },
      }
  }));


const PaymentMethod = ({selectedPaymentMethod, setSelectedPaymentMethod}) => {
    return <Container>
        <ButtonsContainer>
            <RoundedButton onClickHandler={() => setSelectedPaymentMethod(paymentMethods.nomina)} backgroundcolor={selectedPaymentMethod === paymentMethods.nomina ? '#6ec4e8' : '#c8c8c8'} text='Nómina'/>
            <RoundedButton onClickHandler={() => setSelectedPaymentMethod(paymentMethods.efectivo)} backgroundcolor={selectedPaymentMethod === paymentMethods.efectivo ? '#6ec4e8' : '#c8c8c8'} text='Efectivo'/>
            <RoundedButton onClickHandler={() => setSelectedPaymentMethod(paymentMethods.tarjeta)} backgroundcolor={selectedPaymentMethod === paymentMethods.tarjeta ? '#6ec4e8' : '#c8c8c8'} text='Tarjeta'/>
        </ButtonsContainer>
        <HtmlTooltip arrow placement='bottom-start' leaveDelay={300}
        title={
            <FlexContainer>
                <WarningIcon/>
                <TooltipTitle>
                    Antes de agregar un artíiculo al carrito, confirma el <b>Método de Pago</b>
                </TooltipTitle>
            </FlexContainer>
        }
      >
            <IconButton>
                <WarningIcon color='#ff8d6a'/>
            </IconButton>
        </HtmlTooltip>
    </Container>
}

export default PaymentMethod