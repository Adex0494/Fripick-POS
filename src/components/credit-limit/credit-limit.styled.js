import styled from "styled-components";
import ClearIcon from '@mui/icons-material/Clear';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const BottomLine = styled.div`
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 32px;
`

export const StyledCurrencyExchangeIcon = styled(CurrencyExchangeIcon)`
    color: #6ec4e8;
`

export const StyledMoneyIcon = styled(AttachMoneyIcon)`
    color: #fd8d68;
`

export const StyledClearIcon = styled(ClearIcon)`
    position: absolute;
    cursor: pointer;
    top: 24px;
    right: 12px;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 32px;
    position: absolute;
    background-color: white;
    left: 0;
    top: 0;
    z-index: 10;
`

export const IconContainer = styled.div`
    align-self: end;
    width: 24px;
    height: 24px;
`

export const CreditContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 200;
    letter-spacing: 0.5px;
    color: ${({color}) => color};
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    margin-bottom: 32px;
`

export const IconTextFlex = styled.div`
    display: flex;
    gap: 10px;
`

export const BalanceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`

export const BalanceRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
`

export const BalanceText = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
`
