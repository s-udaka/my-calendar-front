import React from "react";
import {
    SignInTemplate,
    SignInTemplateProps
} from "../templates/SignInTemplate";
import { useHistory } from "react-router";

const Login: React.FC = () => {
    const history = useHistory();

    const handleOnClickLogin = (args: {
        email: string,
        password: string
    }) => {
        history.push('/home');
    }

    const SignInProps: SignInTemplateProps = {
        events: {
            onClickLogin: handleOnClickLogin,
        }
    }
    return (
        <SignInTemplate {...SignInProps} />
    );
}

export default Login;
