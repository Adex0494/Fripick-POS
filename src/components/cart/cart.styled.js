import styled from 'styled-components'
import Input from '@mui/material/Input';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const CenteringFlex = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center
`

export const TooltipTitle = styled.div`
    margin-left: 16px;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-size: 16px;
    font-weight: 500;
    color: white;
`

export const SubsidyText = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
    font-weight: 400 !important;
    font-size: 14px;
    text-align: center;
    color: ${({textcolor})=> textcolor};
`

export const InfoContainer = styled.div`
    background: #ff9b7c;
    box-shadow: 1px 2px 6px 0px rgba(37, 62, 145, 0.17);
    transition: all 0.5s ease;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const InfoText = styled.div`
    text-align: center;
    margin-bottom: 0;
    color: #fff;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    font-family: Hind Vadodara, Lucida Sans Unicode !important;
    letter-spacing: 0.8px;
`

export const StyledInfoIcon = styled(InfoOutlinedIcon)`
    color: white;
    margin-top: -6px;
    margin-left: -10px;
    cursor: pointer;
    width: 20px;
    height: 20px;
`

export const  ContainerFlex = styled.div`
    display: flex;
    gap: 2px;
`

export const MarginTopDiv = styled.div`
    margin-top: 16px;
`

export const ButtonText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    font-weight: 300;
    line-height: 1.5;
    font-size: 16px;
    font-weight: ${({bold}) => bold ? 'bold' : '300'};
`

export const StyledButton = styled(Button)`
    box-shadow: 1px 2px 6px 0px rgba(37, 62, 145, 0.17);
    border-radius: 3px;
    width: 100%;
    height: 45px;
    margin-top: 20px !important;
    display: flex !important;
    justify-content: space-between !important;
`

export const DeleteIcon = styled(DeleteOutlinedIcon)`
    width: 24px;
    height: 24px;
    color: #acb4b9;
    cursor: pointer;
    &:hover {
        color: #929aab;
    }
`

export const CartItemPrice = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode;
    font-weight: 600;
    line-height: 1.5;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
`

export const DetailsPrice = styled.div`
    font-family: Hind Vadodara, Lucida Sans Unicode;
    font-weight: 400;
    line-height: 1.5;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 14px;
`

export const CartItemTitle = styled.div`
    font-size: 14px;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    font-weight: 300;
    line-height: 1.5;
`

export const CartContainer = styled.section`
    background-color: white;
    height: 100%;
    border-radius: 3px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const EmptyStateContainer = styled.img`
    height: 100%;
    width: 100%;
    background-size: cover;
`

export const StyledEmployeeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    min-height: 84px;
    background-color: ${({backgroundColor}) => backgroundColor};
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    justify-content: space-between;
    padding: 15px 15px 0 15px;
`
export const EmployeeRowContainer = styled.div`
    display:flex;
    justify-content: space-between;
`


export const StyledEmployeeTitle = styled.div`
    width: 162px;
    min-height: 16px;
    font-size: 16px;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    font-weight: 700px;
    line-height: 16px;
    margin-bottom: 5px;
    color: #fff;
`
export const StyledEmployeeSubTitle = styled.div`
    width: 100px;
    height: 16px;
    font-weight: 700px;
    font-size: 14px;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    line-height: 16px;
    margin-bottom: 5px;
    margin-right: 12px;
    color: #fff;
`

export const CartItemsDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 19.2px;
    height: ${({isEmployeeAccount}) => `calc(100% - ${isEmployeeAccount ? 200 : 128}px)`} ;
`

export const HeightFillerDiv = styled.div`
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

export const CostContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
`

export const CartItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e7e7e7;
    padding: 0 0 20px 0;
    margin-bottom: 20px;
`
export const StyledInput = styled(Input)`
    width: auto;
    max-width: 41px;
    height: 26px;
    background: #f3f3f8;
    border-radius: 3px;
    border-bottom: none;
    color: white;
    margin-right: 5px;
`