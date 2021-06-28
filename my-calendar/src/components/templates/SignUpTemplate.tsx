import React, {
  // useState,
  useEffect
} from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller, SubmitHandler } from "react-hook-form";

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
}

const useStyles = makeStyles((theme) => ({
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

export interface SignUpInputModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpTemplateProps {
  events: {
    onClickSignUp: (args: SignUpInputModel) => void;
  };
  msg: {
    errMsg: string;
  }
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignUpTemplate: React.FC<SignUpTemplateProps> = ({
  events,
  msg
}) => {
  const classes = useStyles();
  // const [values, setValues] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: ''
  // });
  // const handleInputChange = (e: { target: any; }) => {
  //   const target = e.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;
  //   setValues({ ...values, [name]: value });
  // }

  // 入力フォームバリデーション
  const { handleSubmit, control } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = data => {
    events.onClickSignUp({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    })
  };

  useEffect(()=>{
    console.log('SignUpTemplateのuseEffectが実行されました')
  })

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
        <p color='red'>{msg}</p>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: '氏名（名）を入力してください', maxLength: { value: 30, message: '氏名（名）は30文字以内で入力してください' }}}
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    autoComplete="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    // value={values.firstName}
                    // onChange={handleInputChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: '氏名（姓）を入力してください', maxLength: { value: 30, message: '氏名（姓）は30文字以内で入力してください' } }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    // value={values.lastName}
                    // onChange={handleInputChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='email'
                control={control}
                rules={{ required: 'メールアドレスを入力してください', maxLength: { value: 100, message: 'メールアドレスは100文字以内で入力してください' } }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    // value={values.email}
                    // onChange={handleInputChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'パスワードを入力してください',
                  maxLength: { value: 20, message: 'パスワードは20文字以内で入力してください' },
                  minLength: { value: 8, message: 'パスワードは8文字以上で入力してください'  }
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    // value={values.password}
                    // onChange={handleInputChange}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // disabled={!formState.isValid}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
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
