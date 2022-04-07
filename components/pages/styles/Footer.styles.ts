import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) =>
    createStyles({
        customPlansPaper: {
            borderWidth: theme.spacing(0.3),
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderRadius: theme.shape.borderRadius,
            backgroundImage: `linear-gradient(${theme.palette.grey['800']}, ${theme.palette.grey['800']}),
        linear-gradient(120deg, ${theme.palette.accent300.main}, ${theme.palette.accent200.main}, ${theme.palette.accent100.main})`,
            backgroundOrigin: 'border-box',
            backgroundClip: 'content-box, border-box',
            height: '100%',
        },
    }));
