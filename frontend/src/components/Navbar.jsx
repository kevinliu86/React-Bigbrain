import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { ShareContext } from '../functions/shareStates.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar () {
  const classes = useStyles();
  const [newQuizTitle, setNewQuizTitle] = React.useState('');
  const token = localStorage.getItem('Token');
  /***************************************************************************
  *                    Switch button mode in navbar
  ****************************************************************************/
  const context = React.useContext(ShareContext);
  const [showLoginRegister, setShowLoginRegister] = context.showLoginRegister;
  const [showAddQuiz, setShowAddQuiz] = context.showAddQuiz;
  /***************************************************************************
  *                    use share state to reload Dashboard
  ****************************************************************************/
  const [reloadDashBoard, setReloadDashBoard] = context.reloadDashBoard;
  /***************************************************************************
  *                           Logout function
  ****************************************************************************/
  async function logout () {
    try {
      const response = await fetch('http://localhost:5005/admin/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
        },
      });
      if (response.status === 200) {
        localStorage.clear();
        alert('Logout Success!');
        setShowLoginRegister(true);
        setShowAddQuiz(false);
      } else if (response.status === 403) {
        alert('Invalid Token');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  /***************************************************************************
  *             use PUT upload default thumbnail after POST new quiz
  ****************************************************************************/
  async function putDefaultPhoto (responseJson) {
    const defaultPhotoBody = {
      name: newQuizTitle,
      thumbnail:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    };
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/' + responseJson.quizId, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultPhotoBody),
      });
      if (response.status === 200) {
        console.log('default photo success');
      } else if (response.status === 400) {
        alert('Invalid input');
      } else if (response.status === 403) {
        alert('Invalid Token');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  /***************************************************************************
  *                                POST new quiz
  ****************************************************************************/
  async function postNewQuiz () {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/new', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newQuizTitle }),
      });
      if (response.status === 200) {
        const responseJson = await response.json();
        alert('Add new quiz success!');
        putDefaultPhoto(responseJson);
        setReloadDashBoard(reloadDashBoard + 1);
      } else if (response.status === 400) {
        alert('Invalid input');
      } else if (response.status === 403) {
        alert('Invalid Token');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <div className={classes.root}>
      <AppBar style={{ position: 'static', background: '#FFFFFF' }}>
        <Toolbar>
          <Typography
            style={{ color: '#6A5ACD', fontWeight: 'bolder' }}
            variant='h6'
            className={classes.title}
          >
            BigBrain
          </Typography>
          <Link to='/login'>
            {showLoginRegister && (
              <Button className={classes.navButton}>Login</Button>
            )}
          </Link>
          <Link to='/register'>
            {showLoginRegister && (
              <Button className={classes.navButton}>Register</Button>
            )}
          </Link>
          {showAddQuiz && (
            <div style={{ display: 'flex' }}>
              <TextField
                size='small'
                label='New Quiz'
                variant='outlined'
                value={newQuizTitle}
                onChange={(e) => {
                  setNewQuizTitle(e.target.value);
                }}
              />
              <Button
                style={{ backgroundColor: '#27ab18' }}
                color='primary'
                variant='contained'
                onClick={postNewQuiz}
              >
                ADD
              </Button>
            </div>
          )}
          <Link to='/dashboard'>
            {!showLoginRegister && <Button>Home</Button>}
          </Link>
          <Link to='/login'>
            {!showLoginRegister && (
              <Button className={classes.navButton} onClick={logout}>
                Logout
              </Button>
            )}
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
