import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  profileInfo: {
    padding: '0 16px 8px 16px',
    display: 'flex',
  },
  userName: {
    marginRight: '30px',
  },
  socialInfo: {
    display: 'flex',
    alignItems: 'center', // aligns items vertically (alignItems focuses on the cross axis)
    gap: '20px', // adds space between all flex items
  },
  userCount : {
    cursor: 'pointer',
  },
  modal: {
    position: 'absolute', // should this be fixed?
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 20,
    maxHeight: '25vh',
    overflow: 'auto',
    // zIndex: 1000, // is this necessary?
  },
  listedAccount: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px 0",
    // borderBottom: "1px solid #ccc",
  },
});
