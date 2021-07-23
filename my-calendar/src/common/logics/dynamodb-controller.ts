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
        // dockerコンテナ内にセットした環境変数から呼び出している
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
  const params = {
    TableName: tableNameUsers,
    Key: {
      email: email,
    },
  };
  try {
    const dc = ddbClient();
    const data = await dc.get(params).promise();
    console.info('Success', data.Item);
    if (data.Item && data.Item['email']) {
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
