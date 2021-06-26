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
    const [msg, setMsg] = useState('');

    const handleOnClickLogin = (args: SignInInputModel) => {
        if (args.email && args.password) {
            getUser(args.email)
                .then((res) => {
                    if (res) {
                        history.push('/home', { userInfo: res });
                    } else {
                        setMsg('メールアドレスまたはパスワードが正しくありません');
                    }
                })
                .catch(() => {
                    setMsg('例外発生');
                })
        } else {
            setMsg('メールアドレスとパスワードを入力してください');
        }
    }

    const SignInProps: SignInTemplateProps = {
        events: {
            onClickLogin: handleOnClickLogin,
        },
        msg: msg
    }
    return (
        <SignInTemplate {...SignInProps} />
    );
}

export default Login;
