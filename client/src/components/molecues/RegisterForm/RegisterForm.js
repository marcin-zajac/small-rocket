import React, { useState } from 'react';
import FormButton from '../../atoms/FormButton';
import { Slide, Paper, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthIcon from '../../atoms/AuthIcon';
import { register, clearErrors } from '../../../actions/auth';
import { connect } from 'react-redux';
import { getHelper } from '../../../utils/getHelper';
import AlertMessage from '../../atoms/AlertMessage';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(5),
    width: '300px',
    minHeight: theme.spacing(56),
    padding: theme.spacing(2),
  },
  formBtn: { marginTop: theme.spacing(5) },
}));

const RegisterForm = ({ register, errors, clearErrors, alerts, ...props }) => {
  const classes = useStyles(props);

  const [formData, setformData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const { email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    register(email, password, password2);
  };

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    if (password === e.target.value || password2 === e.target.value) {
      clearErrors();
    }
  };

  return (
    <Container maxWidth="sm" align="center">
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <form onSubmit={onSubmit}>
          <Paper elevation={2} className={classes.root}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item>
                <AuthIcon register />
              </Grid>

              <Grid item>
                <AlertMessage severity="error" type="registerAlert" />
              </Grid>

              <Grid item>
                <TextField
                  error={getHelper(errors, 'email').isError}
                  helperText={getHelper(errors, 'email').message}
                  name="email"
                  label="Email"
                  type="email"
                  onChange={onChange}
                  value={email}
                  fullWidth
                />
              </Grid>
              <Grid>
                <TextField
                  error={getHelper(errors, 'password').isError}
                  helperText={getHelper(errors, 'password').message}
                  name="password"
                  label="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid>
                <TextField
                  error={getHelper(errors, 'password2').isError}
                  helperText={getHelper(errors, 'password2').message}
                  name="password2"
                  label="retype password"
                  type="password"
                  value={password2}
                  onChange={onChange}
                  fullWidth
                />
              </Grid>
              <Grid item sm></Grid>

              <Grid className={classes.formBtn} item>
                <FormButton value="register" />
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Slide>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  alerts: state.alert,
});
export default connect(mapStateToProps, { register, clearErrors })(
  RegisterForm
);
