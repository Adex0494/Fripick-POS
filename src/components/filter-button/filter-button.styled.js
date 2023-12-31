import styled from "styled-components";
import Typography from '@mui/material/Typography';

export const StyledLabelBox = styled.div`
    cursor: pointer;
    width: 136px;
    height: 32px;
    color: #acb4b9;
    box-shadow: 1px 2px 6px 0px rgba(37, 62, 145, 0.3);
    outline: ${({selected, color}) => selected ? `solid 3px ${color}` : 'unset'};
    border-radius: 8px;
`

export const StyledBoxFlex = styled.div` 
    display: flex;
    background: white;
`

export const StyledBackgroundDiv= styled.div`
    width: 23px;
    height: 32px;
    background-color: ${({color}) => color};
    border-radius: 3px 0 0 3px;
`

export const StyledDivCentering = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledLabel = styled(Typography)`
    font-size: 14px !important;
`