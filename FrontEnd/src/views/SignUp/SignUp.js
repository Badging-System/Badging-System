import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from "../../utils/API";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  // const [fetch, setFetch] = React.useState(false);
  const [formArray, setFormArray] = React.useState([]);
  const [newUser, setNewUser] = React.useState({Username: "", First_name: "", Last_name: "", Role: "", Active: "", Email: ""});
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [roleValue, setRoleValue] = React.useState("");




  const submittedForm = event => {
    console.log(firstName);
    console.log(lastName);
    console.log(emailAddress);
    console.log(roleValue);
    formArray.push({Username: "testUserName", First_name: firstName, Last_name: lastName, Role: roleValue, Active: true, Email: emailAddress});
    setFormArray(formArray);
    setNewUser(formArray);
    console.log(formArray);
    return new Promise((resolve, reject) => {
      API.post('/users/addSignUpUser', {formArray})
        .then(res => {
          console.log(res);
          resolve(res.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });

    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submittedForm}>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => {setFirstName(e.target.value);}}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => {setLastName(e.target.value);}}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => {setEmailAddress(e.target.value);}}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirm"
                label="Please Confirm Password"
                type="password"
                id="password_confirm"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="User" color="primary" onChange={e => (setRoleValue(e.target.value))} />}
                label="User"
              />
              <FormControlLabel
                control={<Checkbox value="Coach" color="primary" onChange={e => (setRoleValue(e.target.value))} />}
                label="Coach"
              />
              <FormControlLabel
                control={<Checkbox value="Admin" color="primary" onChange={e => (setRoleValue(e.target.value))} />}
                label="Admin"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            // onClick={testFunction}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {/* <Link href="/confirmation" variant="body2">
            Sign Up
            
          </Link> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};