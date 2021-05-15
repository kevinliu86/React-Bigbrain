import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { ShareContext } from '../functions/shareStates.js';
import { isEmptyString } from '../functions/util.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function JoinGame () {
  const context = React.useContext(ShareContext);
  React.useEffect(() => {
    const setShowAddQuiz = context.showAddQuiz[1];
    setShowAddQuiz(false);
  }, []);
  const classes = useStyles();
  const [sessionID, setSessionID] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameValidate, setnameValidate] = React.useState(true);
  const [sessionValidate, setSessionValidate] = React.useState(true);
  const [toPlay, setToPlay] = React.useState(false);
  const [playerID, setPlayerID] = React.useState('');
  // submit form to server
  const joinGameSubmit = async (e) => {
    // prevent auto refresh
    e.preventDefault();
    if (sessionID && name) {
      try {
        const response = await fetch(
          'http://localhost:5005/play/join/' + sessionID,
          {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
          }
        );
        if (response.status === 200) {
          const json = await response.json();
          setPlayerID(json.playerId);
          setToPlay(true);
        } else if (response.status === 400) {
          alert('Bad input');
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      alert('Input empty');
    }
  };
  if (toPlay === true) {
    return <Redirect to={'/play/' + playerID} />;
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Input Name and SessionID to Join
        </Typography>
        <form className={classes.form} noValidate onSubmit={joinGameSubmit}>
          {/* Password Input */}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Session ID'
            type='text'
            value={sessionID}
            onChange={(e) => {
              setSessionID(e.target.value);
            }}
            onBlur={() => {
              setSessionValidate(!isEmptyString(sessionID));
            }}
            error={!sessionValidate}
            helperText={sessionValidate === false ? 'Empty field!' : ' '}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Player Name'
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={() => {
              setnameValidate(!isEmptyString(name));
            }}
            error={!nameValidate}
            helperText={nameValidate === false ? 'Empty field!' : ' '}
          />
          <Button
            fullWidth
            // Enter to Submit
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Join
          </Button>
        </form>
      </div>
    </Container>
  );
}
