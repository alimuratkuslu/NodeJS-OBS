import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Grid container alignItems="center">
          <Grid item>
            <HistoryEduIcon className={classes.icon} fontSize='large'/>
          </Grid>
          <Grid item>
            <Typography variant="h5">Öğrenci Bilgi Sistemi</Typography>
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
            <Button color="inherit" component={Link} to="/students">Students</Button>
            <Button color="inherit" component={Link} to="/professors">Professors</Button>
            <Button color="inherit" component={Link} to="/lectures">Lectures</Button>
            <Button color="inherit" component={Link} to="/exams">Exams</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
