import React, { useState } from 'react';
import {
  SignUpConfirmTemplate,
  SignUpConfirmTemplateProps,
  SignUpConfirmInputModel,
} from '../templates/SignUpConfirmTemplate';
import { useHistory } from 'react-router';
import { confirmSignUp } from '../../common/logics/cognito-controller';

const SignUpConfirm: React.FC = () => {
  const history = useHistory();
  const [errMsg, setErrMsg] = useState('');

  const handleOnClickConfirm = (args: SignUpConfirmInputModel) => {
    if (args.email && args.code) {
      confirmSignUp(args.email, args.code)
        .then((res) => {
          if (res) {
            history.push('/', res);
          } else {
            setErrMsg('メールアドレスまたは確認コードが正しくありません');
          }
        })
        .catch((err) => {
          console.error(err);
          history.replace('/');
        });
    } else {
      setErrMsg('メールアドレスと確認コードを入力してください');
    }
  };

  const handleOnClickSignUp = () => {
    history.push('/signup');
  };

  const SignUpConfirmProps: SignUpConfirmTemplateProps = {
    events: {
      onClickConfirm: handleOnClickConfirm,
      onClickSignUp: handleOnClickSignUp,
    },
    msg: {
      errMsg: errMsg,
    },
  };
  return <SignUpConfirmTemplate {...SignUpConfirmProps} />;
};

export default SignUpConfirm;
