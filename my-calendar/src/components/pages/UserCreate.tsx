import React, {
    useState,
    useEffect
} from "react";
import {
    SignUpTemplate,
    SignUpTemplateProps,
    SignUpInputModel
} from "../templates/SignUpTemplate";
import { useHistory } from "react-router";
import { addUser } from "../../common/logics/dynamodb-controller";

const UserCreate: React.FC = () => {
    const history = useHistory();
    const [errMsg, setErrMsg] = useState('初期値');

    const handleOnClickSignUp = (args: SignUpInputModel) => {
        if (args.firstName && args.lastName && args.email && args.password) {
            addUser(args)
                .then((res) => {
                    if (res) {
                        history.push('/');
                    } else {
                        setErrMsg('ユーザー登録に失敗しました');
                    }
                })
                .catch(() => {
                    setErrMsg('例外発生');
                })
        } else {
            setErrMsg('全ての項目を入力してください');
        }        
    }

    useEffect(()=>{
        console.log('UserCreateのuseEffectが実行されました')
    })

    const SignUpProps: SignUpTemplateProps = {
        events: {
            onClickSignUp: handleOnClickSignUp,
        },
        msg: {
            errMsg: errMsg
        }
    }

    return (
        <SignUpTemplate {...SignUpProps} />
    );
}

export default UserCreate;
