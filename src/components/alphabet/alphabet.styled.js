import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    margin-left: -4px;
    margin-top: 16px;
    flex-wrap: wrap;
`
export const LetterContainer = styled.div`
    margin-right: 14px;
    background-color: transparent;
    cursor: pointer;
    border-radius: ${({selected}) => selected ? '50%' : 'unset' };
    background: ${({selected}) => selected ? '#ff8d6a' : 'unset' };
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LetterTypography = styled.div`
    margin-left: 1px;
    font-size: 17px !important;
    line-height: 30px;
    color: ${({selected}) => selected ? 'white' : ' #919194' };
    font-weight: ${({selected}) => selected ? 'bold' : '500' };
    text-align: center;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
`