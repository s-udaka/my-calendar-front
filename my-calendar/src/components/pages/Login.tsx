import React, { useState } from 'react';
import {
  SignInTemplate,
  SignInTemplateProps,
  SignInInputModel,
} from '../templates/SignInTemplate';
import { useHistory } from 'react-router';
// import { getUser } from '../../common/logics/dynamodb-controller';
// import { getUser } from '../../common/logics/cognito-controller';
import { login } from '../../common/logics/users-controller';

const Login: React.FC = () => {
  const history = useHistory();
  const [errMsg, setErrMsg] = useState('');

  const handleOnClickLogin = (args: SignInInputModel) => {
    if (args.email && args.password) {
      login(args.email, args.password)
        .then((res) => {
          // if (res && res.password === args.password) {
          if (res) {
            console.info(res);
            history.push('/home', res);
          } else {
            setErrMsg('メールアドレスまたはパスワードが正しくありません');
          }
        })
        .catch((err) => {
          console.error(err);
          history.replace('/');
        });
    } else {
      setErrMsg('メールアドレスとパスワードを入力してください');
    }
  };

  const handleOnClickSignUp = () => {
    history.push('/signup');
  };

  const SignInProps: SignInTemplateProps = {
    events: {
      onClickLogin: handleOnClickLogin,
      onClickSignUp: handleOnClickSignUp,
    },
    msg: {
      errMsg: errMsg,
    },
  };
  return <SignInTemplate {...SignInProps} />;
};

export default Login;
