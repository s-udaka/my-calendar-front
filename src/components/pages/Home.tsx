import React, { useEffect } from "react";
import { useLocation, RouteComponentProps } from "react-router";

const Home: React.FC<RouteComponentProps> = () => {
    const location = useLocation<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }>();
    const userInfo = location.state;
    useEffect(()=>{
        console.log('HomeのuseEffectが実行されました');
        console.log(userInfo);
    })

    return (
        <p>ようこそ {userInfo.lastName} {userInfo.firstName} さん</p>
    )
}

export default Home;
