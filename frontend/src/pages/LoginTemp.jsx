import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkText from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright.jsx';
import { Redirect } from 'react-router-dom';
import { isEmptyString } from '../functions/util.js';
import myAxios from '../functions/api.js';

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

export default function SignIn () {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [toMain, setToMain] = React.useState(false);
  const [emailValidate, setEmailValidate] = React.useState(true);
  const [passwordValidate, setPasswordValidate] = React.useState(true);
  // submit form to server
  const loginSubmit = async (e) => {
    // prevent auto refresh
    e.preventDefault();
    if (email && password) {
      try {
        const response = await myAxios.post('admin/auth/login', {
          email,
          password,
        });
        localStorage.setItem('Token', response.data.token);
        setToMain(true);
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      alert('input empty');
    }
  };
  if (toMain === true) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FingerprintIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginSubmit}>
          {/* Email input */}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => {
              setEmailValidate(!isEmptyString(email));
            }}
            error={!emailValidate}
            helperText={emailValidate === false ? 'Empty field!' : ' '}
            autoFocus
          />
          {/* Password Input */}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => {
              setPasswordValidate(!isEmptyString(password));
            }}
            error={!passwordValidate}
            helperText={passwordValidate === false ? 'Empty field!' : ' '}
          />
          <Button
            fullWidth
            // Enter to Submit
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify='flex-end'>
            <LinkText href='/register'>Create account</LinkText>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
