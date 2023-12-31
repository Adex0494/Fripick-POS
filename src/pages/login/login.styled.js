import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export const WarningIcon = styled(WarningAmberOutlinedIcon)`
    color: #ff8d6a;
    height: 16px !important;
    width: 16px !important;
`

export const ValidationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    gap: 12px;
    color: #f26969;
    font-family: icons;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    line-height: 27px;
    margin-bottom: -22px;
    margin-top: 4px;
` 

export const CircularProgressContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 100%;
    height: 100%;
`

export const StyledCircularProgress = styled(CircularProgress)`
    color: white !important;
`

export const TextContainer = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
    margin-top: 5px;
`

export const StyledTypography = styled.div`
    font-weight: 500 !important;
    color: #1e1515 !important;
    font-size: 15px;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
`

export const StyledAText = styled.a`
    cursor: pointer;
    font-weight: 500 !important;
    color: #80bd01 !important;;
    font-size: 15px;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
`

export const ForgotPasswAText = styled.a`
    cursor: pointer;
    margin-top: 20px;
    text-decoration: underline;
    font-size: 13px;
    color: #a7a5a9;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
`

export const Logo = styled.img`
    cursor: pointer;
    background: no-repeat center center;
    background-size: 135px 61px;
    width: 187px;
    height: 83px;
    margin-bottom: 0px;
    display: block;
    background-size: cover;
    transition: all 0.3s ease;
`

export const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f3f8;
`

export const Container = styled.div`
    margin-top: -125px;
    width: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
`

export const StyledTextField = styled(TextField)`
    width: 100%;
    font-size: 24px !important;
`

export const StyledButton = styled(Button)`
    width: 200px;
    border-radius: 50px;
    box-shadow: 1px 2px 6px 0px rgba(37, 62, 145, 0.17);
    border-radius: 3px;
    height: 40px;
    display: flex !important;
    justify-content: space-between !important;
    margin: 10px 65px 0 65px !important;
    display: flex !important;
    justify-content: center !important;
    border-radius: 50px !important;
    text-transform: unset !important;
`

export const ButtonText = styled.div`
    margin-top: 4px;
    align-items: center;
    color: white;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    font-weight: 600 !important;
    line-height: 1.5;
    font-size: 14px;
    font-weight: ${({bold}) => bold ? 'bold' : '300'};
`