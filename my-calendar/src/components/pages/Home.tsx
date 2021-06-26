import React from "react";
import { UserModel } from "../../common/logics/dynamodb-controller";

export interface HomeProps {
    userInfo: UserModel
}

const Home: React.FC<HomeProps> = ({
    userInfo
}) => {
    return (
        <p>ようこそ {userInfo.lastName} {userInfo.firstName} さん</p>
    )
}

export default Home;
