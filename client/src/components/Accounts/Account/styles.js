import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  title: {
    padding: '0 16px',
    cursor: "pointer",
  },
  avatar: {
    height: "150px",
    width: "150px",
    cursor: "pointer",
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
});
