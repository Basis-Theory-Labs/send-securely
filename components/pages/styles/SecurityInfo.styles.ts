import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) =>
  createStyles({
    paper: {
      borderWidth: theme.spacing(0.3),
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: theme.shape.borderRadius,
      backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)), ${theme.palette.accent100.main})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      height: '100%',
    },
  })
);
