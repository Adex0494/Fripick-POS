import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const StyledTextField = styled(TextField)`
    width: stretch;
    background: white;
    margin: 16px 16px ${({opentooltip}) => opentooltip ? '82px' : '16px'} 16px !important;
`

export const MethodContainer = styled.div`
    background: #f3f3f8;
    width: 100%;
    border-radius: 5px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Text = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-weight: 400 !important;
    font-size: 16px;
    text-align: center;
`


export const TooltipTitle = styled.div`
    margin-left: 16px;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-size: 16px;
    font-weight: 500;
    color: white;
`