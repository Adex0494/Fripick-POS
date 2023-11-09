import React from "react";
import { Container, IconContainer, CreditContainer, BalanceContainer, BalanceRow,
     BalanceText, StyledClearIcon, StyledMoneyIcon, IconTextFlex, StyledCurrencyExchangeIcon, BottomLine } from './credit-limit.styled'

const colorMap={
    'Límite de Crédito': '#6ec4e8',
    'Asignación': '#fd8d68'
}

const CreditLimit = ({balances, close}) => {
    return <Container>
        <IconContainer >
            <StyledClearIcon onClick={close}/>
        </IconContainer>
        {balances?.map(balance => <BottomLine> <CreditContainer color={colorMap[balance.name] || '#fd8d68'}>
                <IconTextFlex>
                    {balance.name === 'Límite de Crédito' ? <StyledCurrencyExchangeIcon/> : balance.name === 'Asignación' ? <StyledMoneyIcon/> : <StyledCurrencyExchangeIcon/>}
                    <div>{balance.name}</div>
                </IconTextFlex>
                <BalanceContainer>
                    {balance.balances?.map(balance => <BalanceRow key={balance.name}>
                        <BalanceText>{balance.name}</BalanceText>
                        <BalanceText><strong>{`RD$ ${balance.amount}`}</strong></BalanceText>
                    </BalanceRow> )}
                </BalanceContainer>    
            </CreditContainer>
         </BottomLine> ) }

    </Container>
}

export default CreditLimit