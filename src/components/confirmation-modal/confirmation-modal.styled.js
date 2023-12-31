import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';

export const AmountsContainer = styled.div`
    padding-left: 45px;
    padding-right: 45px;
    width: stretch;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
`

export const CashCardSelectorContainer = styled.div`
    width: stretch;
    padding-left: 32px;
    padding-right: 32px 
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

export const ReasonContainer = styled.div`
    width: 100%;
    margin-top: ${({opentooltip}) => opentooltip ? '66px' : '16px'} !important;
`


export const TooltipTitle = styled.div`
    margin-left: 16px;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-size: 16px;
    font-weight: 500;
    color: white;
`

export const StyledClearIcon = styled(ClearIcon)`
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 12px;
`

export const StyledButton = styled(Button)`
    color: white !important;
    width: 150px;
    height: 45px;
    margin-top: ${({opentooltip}) => opentooltip ? '72px' : '32px'} !important;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    font-size: 14px !important;
    font-weight: 300 !important;
    line-height: 1.5 !important;
    letter-spacing: 0.8px !important;
`

export const StyledTextField = styled(TextField)`
    width: 100%;
    font-size: 24px !important;
`

export const PinContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    max-width: 230px;
    margin-top: ${({margintop}) => margintop || '16'}px;
    margin-bottom: 32px;
`

export const NumberText = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-weight: 400
    font-size: 16px;
    text-align: right;
    width: 100%;
`

export const DetailText = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-weight: ${({bold})=> bold ? '600' : '400'} !important;
    font-size: 14px;
    text-align: ${({align})=> align || 'center'};
    color: ${({textcolor})=> textcolor};
    margin-bottom: ${({marginBottom}) => marginBottom}px !important;
`

export const FlexContainer = styled.div`
    display: flex;
    height: 100%;
    overflow: auto;

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

export const SummaryContainer = styled.div`
    position: relative;
    width: 490px;
    min-width: 300px;
    height: fit-content;
    padding: 76px 0 16px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
`
export const LeftContainer = styled.div`
    flex-grow: 1;
`

export const DetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const Header = styled.div`
    background-color: ${({backgroundcolor}) => backgroundcolor};
    padding: 18px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    border-top-left-radius: 4px;

`

export const TableContainer = styled.div`
    margin: 30px 0 30px 30px;
    height: calc(100% - 150px);
    width: calc(100% - 30px);
    overflow: auto;

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

export const StyledTitle = styled.div`
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.8px;
`

export const StyledMoneyText = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-size: 14px;
    font-weight: 600;
`