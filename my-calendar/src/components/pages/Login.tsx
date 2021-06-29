import React, { useState } from "react";
import {
    SignInTemplate,
    SignInTemplateProps,
    SignInInputModel
} from "../templates/SignInTemplate";
import { useHistory } from "react-router";
import { getUser } from "../../common/logics/dynamodb-controller";

const Login: React.FC = () => {
    const history = useHistory();
    const [errMsg, setErrMsg] = useState('');

    const handleOnClickLogin = (args: SignInInputModel) => {
        if (args.email && args.password) {
            getUser(args.email)
                .then((res) => {
                    if (res && res.password === args.password) {
                        history.push('/home', res);
                    } else {
                        setErrMsg('メールアドレスまたはパスワードが正しくありません');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    history.replace('/');
                })
        } else {
            setErrMsg('メールアドレスとパスワードを入力してください');
        }
    }

    const SignInProps: SignInTemplateProps = {
        events: {
            onClickLogin: handleOnClickLogin,
        },
        msg: {
            errMsg: errMsg
        }
    }
    return (
        <SignInTemplate {...SignInProps} />
    );
}

export default Login;
