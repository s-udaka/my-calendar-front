import {
    PutItemCommand,
    DynamoDBClient
} from "@aws-sdk/client-dynamodb";
import { SignUpInputModel } from "../../components/templates/SignUpTemplate";

// DynamoDBClientの使用準備
const ddbClient = new DynamoDBClient({
    region: 'ap-northeast-1',
    endpoint: process.env.REACT_APP_DB_ENDPOINT,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESSKEY!,
        secretAccessKey: process.env.REACT_APP_AWS_SEC_ACCESSKEY!
    }
});

// ユーザーテーブルのテーブル名定義
const tableNameUsers = 'users';

/**
 * ユーザーテーブルに新規ユーザーを登録する
 * @param args - 登録するユーザーの情報
 * @returns ユーザー登録処理結果 {boolean}
 */
export const userRegist = async (item: SignUpInputModel): Promise<boolean> => {
    const params = {
        TableName: tableNameUsers,
        Item: {
            firstName: { S: item.firstName },
            lastName: { S: item.lastName },
            email: { S: item.email },
            password: { S: item.password },
        },
    };
    try {
        const data = await ddbClient.send(new PutItemCommand(params));
        console.log(data);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
