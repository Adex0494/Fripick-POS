import styled from 'styled-components'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const StyledButton = styled(Button)`
`

export const StyledAutocomplete = styled(Autocomplete)`
    width: 100%;
    height: 56px;
    background: white;
`

export const StyledTextField = styled(TextField)`
`

export const StyledDiv = styled.div`
    display: flex;
`

export const StyledIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 56px;
    background: ${({color}) => color};
    color: white;
    margin-top: -16px;
    margin-right: -8px;
    border-radius: 4px;
`