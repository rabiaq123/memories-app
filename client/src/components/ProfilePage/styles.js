import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  pfp: {
    height: '100px',
    width: '100px',
    marginRight: '20px',
  },
  profileInfo: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginRight: '20px',
    marginBlockStart: '0em',
    marginBlockEnd: '0em',
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
    border: '1px solid lightgray',
    boxShadow: 24,
    padding: 20,
    maxHeight: '30vh',
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
