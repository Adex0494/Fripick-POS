import styled from "styled-components";
import Button from '@mui/material/Button';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TooltipTitle = styled.div`
    margin-left: 16px;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-size: 12px;
    font-weight: 500;
`

export const WarningIcon = styled(WarningAmberOutlinedIcon)`
    color: ${({color})=>color};
`

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #e7e7e7;
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`

export const StyledButton = styled(Button)`
    border-radius: 50px !important;
    width: 62px;
    height: 32px;
    color: white !important;
    background-color: ${({backgroundcolor})=>backgroundcolor} !important;
`