
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  submit: {
    marginBottom: 10,
    marginTop: 16
  },
  modal: {
    position: 'absolute', // should this be fixed?
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '1px solid lightgray',
    boxShadow: 24,
    padding: 20,
    overflow: 'auto',
    // zIndex: 1000, // is this necessary?
  },
  error: {
    color: theme.palette.secondary.main,
  },
}));
