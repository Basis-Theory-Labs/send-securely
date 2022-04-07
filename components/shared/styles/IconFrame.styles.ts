import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRadius: 1,
      background: theme.palette.grey['800'],
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.create(['background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
    },
    small: {
      height: theme.spacing(4),
      minWidth: theme.spacing(4),
    },
    medium: {
      height: theme.spacing(6),
      minWidth: theme.spacing(6),
    },
    large: {
      height: theme.spacing(8),
      minWidth: theme.spacing(8),
    },
  })
);
