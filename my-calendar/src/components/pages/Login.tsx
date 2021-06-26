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
            console.info('getUser呼び出し前');
            getUser(args.email)
                .then((res) => {
                    console.info("🚀 ~ file: Login.tsx ~ line 18 ~ .then ~ res", res)
                    if (res) {
                        history.push('/home', { userInfo: res });
                    } else {
                        setMsg('メールアドレスまたはパスワードが正しくありません');
                    }
                })
                .catch(() => {
                    console.info('getUser呼び出し後キャッチ');
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
