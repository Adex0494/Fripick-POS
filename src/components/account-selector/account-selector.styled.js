import styled from "styled-components";
import Button from '@mui/material/Button';

export const Container = styled.div`
    margin-top: 6px;
`

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: top;
`

export const StyledColorButton = styled(Button)`
    background-color: ${({backgroundcolor}) => backgroundcolor} !important;
    color: ${({textcolor}) => textcolor} !important;
    width: 170px;
    height: ${({ height }) => height}px;
`

export const Typography = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-size: 10px;
    font-weight: 600;
`

