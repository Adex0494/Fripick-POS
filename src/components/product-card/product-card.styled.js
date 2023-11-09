import styled from 'styled-components'
import Typography from '@mui/material/Typography';

export const StyledLabelBox = styled.div`
    position: relative;
    cursor: pointer;
    max-width: 300px;
    min-height: 80px;
    color: #acb4b9;
    box-shadow: 1px 2px 6px 0px rgba(37, 62, 145, 0.3);
    outline: ${({selected, color}) => selected ? `solid 3px ${color}` : 'unset'};
    border-radius: 8px;
    background: white;
`

export const StyledBackgroundDiv= styled.div`
    position: absolute;
    width: 23px;
    height: 100%;
    background-color: ${({color}) => color};
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
`

export const StyledLabel = styled.div`
    background: #e7e7e7;
    color: #b2b2b2;
    font-size: 14px !important;
    font-weight: 700 !important;
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 4px;
    border-radius: 3px;
    width: 55px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledTitle = styled.div`
    width: auto;
    font-size: 16px;
    color: #4d4d4d;
    font-weight: 500;
    margin-bottom: 5px;
    white-space: initial;
    line-height: 15px;
    word-break: break-word;
`

export const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 22px;
    margin-left: 32px;
    margin-right: 6px;
`
export const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`



