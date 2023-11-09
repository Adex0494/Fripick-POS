import styled from "styled-components";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


export const Container = styled.div`
    position: absolute;
    top: -4px;
    left: 0;
    padding: 24px 18px;
    margin-top: 4px;
    margin-bottom: 16px;
    background: #f3f3f8;
    display: ${({thisDisplay}) => thisDisplay};
    opacity: ${({thisOpacity}) => thisOpacity};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: ${({thisTransition}) => thisTransition};
    z-index: 20;
`

export const StyledCloseIcon = styled(CloseIcon)`
    height: 16px !important;
    width: 16px !important;
    background-size: 110px !important;
    color: rgb(178, 178, 178);
    top: 5px;
    right: 5px;
    position: absolute;
    cursor: pointer;
`

export const TextDiv = styled.div`
    text-align: center;
    font-size: 15px !important;
    font-weight: 300 !important;
    margin-bottom: 14px;
    line-height: 1.5;
    color: #212529;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
`

export const StyledButton = styled(Button)`
    width: 140px;
    margin: 0 auto !important;
    opacity: 0.8;
    border-radius: 50px !important;
    border: none;
    padding: 8px 20px;
    background: #6ec4e8 !important;
    color: white !important;
    line-height: 19px;
    text-transform: initial !important;
`