import React, { useState } from "react";
import {
    SignUpTemplate,
    SignUpTemplateProps,
    SignUpInputModel
} from "../templates/SignUpTemplate";
import { useHistory } from "react-router";
import { userRegist } from "../../common/logics/dynamodb-controller";

const UserCreate: React.FC = () => {
    const history = useHistory();
    const [msg, setMsg] = useState('');

    const handleOnClickSignUp = (args: SignUpInputModel) => {
        userRegist(args)
            .then((res) => {
                if (res) history.push('/');
                else setMsg('ユーザー登録に失敗しました');
            })
            .catch(() => {
                setMsg('例外発生');
            })
        history.push('/home');
    }

    const SignUpProps: SignUpTemplateProps = {
        events: {
            onClickSignUp: handleOnClickSignUp,
        },
        msg: msg
    }

    return (
        <SignUpTemplate {...SignUpProps} />
    );
}

export default UserCreate;
