import styled from "styled-components";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'black',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'black',
    },
  }));

  export const StyledLabel = styled.div`
    background: #e7e7e7;
    color: #b2b2b2;
    font-size: 14px !important;
    font-weight: 700 !important;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 4px;
    border-radius: 3px;
    width: 55px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledDescriptionIcon = styled(DescriptionOutlinedIcon)`
    color: rgb(172, 180, 185);
    width: 18px !important;
    height: 18px !important;
`

export const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 116px;
    border: ${({ borderColor }) => `3px solid ${borderColor}`};
    border-radius: 10px;
    background: white;
`

export const IconContainer = styled.div`
    position: absolute;
    right: -7px;
    top: 2px;
    width: 25px;
    height: 25px;
    display: block;
    cursor: pointer;
    text-decoration: none !important;
`

export const LastProductsLabel = styled.div`
    position: absolute;
    top: -14px;
    left: calc(50% - 115px);
    width: 230px;
    height: 24px;
    text-align: center;
    font-size: 13px;
    background: ${({backgroundColor}) => backgroundColor};
    color: white;
    line-height: 24px;
    font-weight: 500; 
    border-radius: 50px;
    font-family: Hind Vadodara, Lucida Sans Unicode;
`

export const SpaceAroundContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: ${({spaceAround}) => spaceAround ? 'space-around' : 'space-between'};
    overflow-x: auto;

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
    width: auto;
    font-size: 14px;
    color: #4d4d4d;
    font-weight: 600;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    margin-bottom: 5px;
    white-space: initial;
    line-height: 15px;
    max-height: 30px;
    padding-left: 6px;
    margin-right: 6px;
    padding-top: 3px;
`

export const LastProductCard = styled.div`
    position: relative;
    min-width: 150px;
    max-width: 224px;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin-left: 15.2px;
    margin-right: 15.2px;
    background: #f3f3f8;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 6px;
    margin-top: 6px;
`

export const StyledTitleLight = styled.div`
    width: auto;
    font-size: 14px;
    color: #4d4d4d;
    font-weight: 500;
    font-family: Hind Vadodara, Lucida Sans Unicode;
    margin-bottom: 5px;
    white-space: initial;
    line-height: 15px;
    max-height: 30px;
    padding-left: 6px;
    margin-right: 6px;
`