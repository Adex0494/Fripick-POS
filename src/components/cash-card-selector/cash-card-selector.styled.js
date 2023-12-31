import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const TooltipTitle = styled.div`
    margin-left: 16px;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-size: 16px;
    font-weight: 500;
    color: white;
`

export const StyledTextField = styled(TextField)`
    width: stretch;
    background: white;
    margin: 16px 16px ${({opentooltip}) => opentooltip ? '82px' : '16px'} 16px !important;
`

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
`

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;

`

export const Text = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-weight: 400 !important;
    font-size: 16px;
    text-align: center;
`