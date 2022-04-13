import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) =>
  createStyles({
    paper: {
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      height: '100%',
    },
  })
);
