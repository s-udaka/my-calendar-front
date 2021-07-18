// import {
//   PutItemCommand,
//   GetItemCommand,
//   DynamoDBClient,
// } from '@aws-sdk/client-dynamodb';
import * as aws from 'aws-sdk';
import { SignUpInputModel } from '../../components/templates/SignUpTemplate';

// DynamoDBClientの使用準備
const ddbClient = () => {
  // local環境の場合のみ、エンドポイントとダミー情報をセット
  if (process.env.REACT_APP_ENV === 'local') {
    // return new DynamoDBClient({
    return new aws.DynamoDB.DocumentClient({
      region: process.env.REACT_APP_DB_REGION,
      endpoint: process.env.REACT_APP_DB_ENDPOINT,
      credentials: {
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy',
      },
    });
  } else {
    // return new DynamoDBClient({
    return new aws.DynamoDB.DocumentClient({
      region: process.env.REACT_APP_DB_REGION,
      credentials: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY!,
      },
    });
  }
};

// ユーザーテーブルのテーブル名定義
const tableNameUsers = 'users';

/**
 * ユーザーテーブルに新規ユーザーを登録する
 * @param args - 登録するユーザーの情報
 * @returns ユーザー登録処理結果 {boolean}
 */
export const addUser = async (item: SignUpInputModel): Promise<boolean> => {
  console.info('環境変数読み込めてるか');
  console.info(process.env.REACT_APP_ENV);
  console.info(process.env.REACT_APP_DB_REGION);
  console.info(process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI);
  console.info(process.env.REACT_APP_AWS_ACCESS_KEY);
  console.info(process.env.REACT_APP_AWS_SECRET_KEY);
  // const params = {
  //   TableName: tableNameUsers,
  //   Item: {
  //     firstName: { S: item.firstName },
  //     lastName: { S: item.lastName },
  //     email: { S: item.email },
  //     password: { S: item.password },
  //   },
  // };
  const params = {
    TableName: tableNameUsers,
    Item: {
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      password: item.password,
    },
  };
  try {
    const dc = ddbClient();
    const data = await dc.put(params).promise();
    // const data = await dc.send(new PutItemCommand(params));
    console.info(data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * メールアドレスをキーにユーザー情報を取得する
 * @param email - ユーザー情報のプライマリキーとなるメールアドレス
 * @returns ユーザー情報 {UserModel|undefined}
 */
export const getUser = async (
  email: string
): Promise<UserModel | undefined> => {
  console.info('環境変数読み込めてるか');
  console.info(process.env.REACT_APP_ENV);
  console.info(process.env.REACT_APP_DB_REGION);
  console.info(process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI);
  console.info(process.env.REACT_APP_AWS_ACCESS_KEY);
  console.info(process.env.REACT_APP_AWS_SECRET_KEY);
  // const params = {
  //   TableName: tableNameUsers,
  //   Key: {
  //     email: { S: email },
  //   },
  // };
  const params = {
    TableName: tableNameUsers,
    Key: {
      email: email,
    },
  };
  try {
    const dc = ddbClient();
    // const data = await dc.send(new GetItemCommand(params));
    const data = await dc.get(params).promise();
    console.info('Success', data.Item);
    if (data.Item && data.Item['email']) {
      // const res: UserModel = {
      //   firstName: String(data.Item['firstName'].S),
      //   lastName: String(data.Item['lastName'].S),
      //   email: String(data.Item['email'].S),
      //   password: String(data.Item['password'].S),
      // };
      const res: UserModel = {
        firstName: String(data.Item['firstName']),
        lastName: String(data.Item['lastName']),
        email: String(data.Item['email']),
        password: String(data.Item['password']),
      };
      return res;
    } else {
      return undefined;
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
