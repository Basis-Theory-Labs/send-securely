import { TextField } from '@mui/material';
import { styled } from '@mui/styles';

export const ScrollableText = styled(TextField)(({ theme }) => ({
  width: theme.spacing(69),
  overflowX: 'hidden',
  borderRadius: theme.spacing(1),
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'rgba(255, 255, 255, 0.23)',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '& textarea': {
    fontFamily: 'Source Code Pro',
    lineHeight: theme.spacing(3),
    fontSize: theme.spacing(2),
    overflow: 'auto',
    padding: theme.spacing(1),
    WebkitMaskImage: `linear-gradient(180deg, ${theme.palette.background.paper} 75%, transparent)`,
  },
  '& .MuiOutlinedInput-root': {
    width: theme.spacing(70.625),
    maxHeight: theme.spacing(15),
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none',
  },
}));
