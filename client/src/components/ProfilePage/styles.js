import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  profileInfo: {
    padding: '0 16px 8px 16px',
    display: 'flex',
  },
  userName: {
    marginRight: '30px',
  },
  followingInfo: {
    display: 'flex',
    alignItems: 'center', // aligns items vertically (alignItems focuses on the cross axis)
    gap: '20px', // adds space between all flex items
  },
});
