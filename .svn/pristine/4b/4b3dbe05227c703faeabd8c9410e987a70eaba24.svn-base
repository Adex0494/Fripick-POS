import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'; 
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#ff6f66',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #ff6f66',
      height:'50px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#ff6f66',
        left: "-75px !important",
        "&:before": {
            border: '1px solid #ff6f66'
          },
      }
}));

export default HtmlTooltip
