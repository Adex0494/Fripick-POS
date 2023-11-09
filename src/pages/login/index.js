import React, { useState, useEffect } from 'react'
import {
    MainContainer, StyledTextField, Container, StyledButton, ButtonText, Logo, StyledTypography,
    StyledAText, TextContainer, ForgotPasswAText, CircularProgressContainer, StyledCircularProgress,
    WarningIcon, ValidationContainer
} from './login.styled'
import LogoFripick from '../../assets/logoFripick.svg'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ loginHandler, isLoading, isLoginFail, openAlert, setOpenAlert }) => {
    const [userNameValue, setUserNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [validation, setValidation] = useState(true)
    const [validationText, setValidationText] = useState('')

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false)
    };

    useEffect(() => {
        if (isLoginFail) {
            setValidation(false)
            setValidationText('Usuario o contraseña incorrectos')
        }
    }, [isLoginFail])


    const onChangeUserName = (value) => {
        if (!validation && passwordValue.length > 0) setValidation(true)
        setUserNameValue(value)
    }

    const onChangePassword = (value) => {
        if (!validation && userNameValue.length > 0) setValidation(true)
        setPasswordValue(value)
    }


    const processLoginValues = () => {

        if (userNameValue.length === 0 || passwordValue.length === 0) {
            setValidation(false)
            setValidationText('Digite el nombre de usuario y la contraseña')
            return
        }
        loginHandler(userNameValue, passwordValue)
    }

    return <MainContainer>
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity='error' sx={{ width: '100%' }}>
                {'Ocurrió un error inesperado al tratar de iniciar sesión'}
            </Alert>
        </Snackbar>
        <Container>
            <Logo onClick={() => window.location.href = 'https://fripick.com'} src={LogoFripick} />
            <TextContainer>
                <StyledTypography>¿Quieres saber más?</StyledTypography>
                <StyledAText href='https://fripick.com'>Click aquí</StyledAText>
            </TextContainer>
            <StyledTextField variant="outlined"
                label='fripick ID, Alias o Email'
                InputProps={{ sx: { backgroundColor: 'white', fontSize: 14, height: '45px', borderRadius: 50, boxShadow: '1px 1px 6px 0px rgba(37, 62, 145, 0.17)' } }}
                value={userNameValue}
                onChange={(e) => onChangeUserName(e.target.value)}
                InputLabelProps={{
                    style: { marginTop: -4, fontSize: 14, color: 'rgb(178, 178, 178)' },
                }}
            />
            <StyledTextField variant="outlined"
                type='password'
                label='Contraseña'
                InputProps={{ sx: { backgroundColor: 'white', fontSize: 14, height: '45px', borderRadius: 50, boxShadow: '1px 1px 6px 0px rgba(37, 62, 145, 0.17)' } }}
                value={passwordValue}
                onChange={(e) => onChangePassword(e.target.value)}
                InputLabelProps={{
                    style: { marginTop: -4, fontSize: 14, color: 'rgb(178, 178, 178)' },
                }}
            />
            {!validation && <ValidationContainer>
                <WarningIcon />
                <p>{validationText}</p>
            </ValidationContainer>}

            <ForgotPasswAText href='https://fripick.com/login/#'>Olvidé mi Contraseña</ForgotPasswAText>
            <StyledButton onClick={processLoginValues} variant='contained'>
                {isLoading ? <CircularProgressContainer><StyledCircularProgress /></CircularProgressContainer> :
                    <ButtonText>
                        Entrar
                    </ButtonText>}
            </StyledButton>
        </Container>
    </MainContainer>
}

export default Login