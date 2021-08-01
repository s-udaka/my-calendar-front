import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

const Copyright = () => {
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
};

const theme = createTheme();
const useStyles = makeStyles(() => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface SignUpConfirmInputModel {
  email: string;
  code: string;
}

export interface SignUpConfirmTemplateProps {
  events: {
    onClickConfirm: (args: SignUpConfirmInputModel) => void;
    onClickSignUp: () => void;
  };
  msg: {
    errMsg: string;
  };
}

export const SignUpConfirmTemplate: React.FC<SignUpConfirmTemplateProps> = ({
  events,
  msg,
}) => {
  const classes = useStyles();

  // 入力フォームバリデーション
  const { handleSubmit, control } = useForm<SignUpConfirmInputModel>();
  const onSubmit: SubmitHandler<SignUpConfirmInputModel> = (data) => {
    events.onClickConfirm({
      email: data.email,
      code: data.code,
    });
  };

  // アカウント作成ページへ
  const onClickSignUpLink = () => {
    events.onClickSignUp();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SignUp Confirm
        </Typography>
        <p color="red">{msg.errMsg}</p>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'メールアドレスを入力してください',
              maxLength: {
                value: 100,
                message: 'メールアドレスは100文字以内で入力してください',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="code"
            control={control}
            rules={{
              required: '確認コードを入力してください',
              maxLength: {
                value: 10,
                message: '確認コードは10文字以内で入力してください',
              },
              minLength: {
                value: 6,
                message: '確認コードは6文字以上で入力してください',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="code"
                label="Code"
                id="code"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            SignUp Confirm
          </Button>
          <Grid container>
            <Grid item>
              <Link href="" variant="body2" onClick={onClickSignUpLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
