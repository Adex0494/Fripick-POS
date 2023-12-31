import styled from 'styled-components'
import Input from '@mui/material/Input';
import ClearIcon from '@mui/icons-material/Clear';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export const StyledCheckBox = styled(Checkbox)`
`

export const MainColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const MaxHeightDiv = styled.div`
    flex-grow: 1;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgb(200, 200, 200);
        border-radius: 100px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(175, 175, 175);
        border-radius: 100px;
    }
`

export const PriceTitle = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    color: #ff8d6a;
    font-size: 32px;
    text-align: center;
    line-height: 1.5;
    font-weight: 300;
`

export const StyledButton = styled(Button)`
    box-shadow: 1px 2px 6px 0px rgba(37, 62, 145, 0.17);
    border-radius: 50px !important;
    width: 225px;
    padding: 14px 11px;
    height: 45px;
    background: ${({disabled}) => disabled ? '#a1a1a1' : '#7cb30a'}!important;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    font-weight: 700;
    line-height: 1.5;
    font-size: 14px;
    font-weight: ${({bold}) => bold ? 'bold' : '300'};
`

export const FooterColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Footer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #e9ecef;
    width: 100%;
    height: 126px;
`

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 0;
    word-wrap: break-word;
    background: ${({selected, selectedColor}) => selected ? selectedColor : 'white'};
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 6px;
    padding: 20px;
    cursor: pointer;
    min-width: 66px;
    min-height: 24px;
    padding: 12px;

`

export const CardTitle = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    margin: 0;
    font-weight: 400;
    line-height: 1.5;
    color: ${({selected}) => selected ? 'white' : 'unset'};
`

export const StyledRadio = styled(Radio)`
    color: white;
`

export const StyledClearIcon = styled(ClearIcon)`
    cursor: pointer;
`

export const StyledInput = styled(Input)`
    background: white;
    border-bottom: none;
    color: white;
    width: 45px;
    height: 37px;
    line-height: 1.65;
    padding: 0;
    margin: 0;
    text-align: center;
    border-radius: 3px 0 0 3px;
    border: 1px solid #eee;
`


export const StyledTitle = styled.div`
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    font-size: 20px;
    margin-left: 20px
`

export const StyledSubTitle = styled.div`
    font-weight: 700;
    line-height: 1.2;
    font-size: 20px;
    margin-left: 20px
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    margin-top: 32px;
    margin-bottom: 20px;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`
export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const MainContainer = styled.div`
    background: #f3f3f8;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const InnerContainer = styled.div`
    background: white;
    box-shadow: 1px 2px 6px 0px rgba(37, 62, 145, 0.17);
    border-radius: 5px;
    margin: 16px;
    width: 100%;
    height: calc(100% - 64px);
    padding: 16px;
`