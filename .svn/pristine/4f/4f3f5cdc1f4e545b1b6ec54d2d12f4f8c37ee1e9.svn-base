import React from 'react'
import { Container, ButtonsContainer, StyledColorButton,  Typography } from './account-selector.styled'
import { accountTypes } from '../../constants'

const AccountSelector = ({selectedAccountTypeId, setSelectedAccountTypeId}) =>{
    return <Container>
        <ButtonsContainer>
            <StyledColorButton onClick={()=> setSelectedAccountTypeId(accountTypes.employee)} backgroundcolor={selectedAccountTypeId === accountTypes.employee ? 'white' : '#e07454'} 
                textcolor={selectedAccountTypeId === accountTypes.employee ? '#6ec4e8' : 'white'} height={selectedAccountTypeId === accountTypes.employee ? 48 : 36}><Typography>Nómina</Typography></StyledColorButton>
            <StyledColorButton onClick={()=> setSelectedAccountTypeId(accountTypes.company)} backgroundcolor={selectedAccountTypeId === accountTypes.employee ? '#47a3c3' : 'white'} 
                textcolor={selectedAccountTypeId === accountTypes.employee ? 'white' : '#ff8d6a'} height={selectedAccountTypeId === accountTypes.employee ? 36 : 48}><Typography>Cuenta Empresa</Typography></StyledColorButton>
        </ButtonsContainer>
    </Container>
}

export default AccountSelector