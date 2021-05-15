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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp () {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [toMain, setToMain] = React.useState(false);
  const [emailValidate, setEmailValidate] = React.useState(true);
  const [passwordValidate, setPasswordValidate] = React.useState(true);
  const [nameValidate, setNameValidate] = React.useState(true);
  // submit form to server
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (email && password && name) {
      try {
        const response = await myAxios.post('admin/auth/register', {
          email,
          password,
          name,
        });
        localStorage.setItem('Token', response.data.token);
        setToMain(true);
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      alert('Input Empty');
    }
  };
  // Redirect to home page
  if (toMain === true) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
          <FingerprintIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create Your Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={registerSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* email input */}
              <TextField
                variant='outlined'
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
            </Grid>
            {/* password input */}
            <Grid item xs={12}>
              <TextField
                variant='outlined'
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
            </Grid>
            {/* name input */}
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                variant='outlined'
                required
                fullWidth
                label='Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onBlur={() => {
                  setNameValidate(!isEmptyString(name));
                }}
                error={!nameValidate}
                helperText={nameValidate === false ? 'Empty field!' : ' '}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={registerSubmit}
          >
            Submit
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <LinkText href='/login'>Sign in instead</LinkText>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;
