import React, { useState, useEffect } from "react";
import {
    SignUpTemplate,
    SignUpTemplateProps,
    SignUpInputModel
} from "../templates/SignUpTemplate";
import { useHistory } from "react-router";
import { addUser } from "../../common/logics/dynamodb-controller";

const UserCreate: React.FC = () => {
    const history = useHistory();
    const [msg, setMsg] = useState('');

    const handleOnClickSignUp = (args: SignUpInputModel) => {
        if (args.firstName && args.lastName && args.email && args.password) {
            addUser(args)
                .then((res) => {
                    if (res) {
                        history.push('/');
                    } else {
                        setMsg('ユーザー登録に失敗しました');
                    }
                })
                .catch(() => {
                    setMsg('例外発生');
                })
        } else {
            setMsg('全ての項目を入力してください');
        }        
    }

    useEffect(()=>{
        console.log('UserCreateのuseEffectが実行されました')
    })

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
