import {
  PutItemCommand,
  GetItemCommand,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { SignUpInputModel } from '../../components/templates/SignUpTemplate';

// DynamoDBClientの使用準備
const ddbClient = () => {
  // local環境の場合のみ、エンドポイントとダミー情報をセット
  if (process.env.REACT_APP_ENV === 'local') {
    return new DynamoDBClient({
      region: process.env.REACT_APP_DB_REGION,
      endpoint: process.env.REACT_APP_DB_ENDPOINT,
      credentials: {
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy',
      },
    });
  } else {
    return new DynamoDBClient({
      region: process.env.REACT_APP_DB_REGION,
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
      firstName: { S: item.firstName },
      lastName: { S: item.lastName },
      email: { S: item.email },
      password: { S: item.password },
    },
  };
  try {
    const dc = ddbClient();
    const data = await dc.send(new PutItemCommand(params));
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
      email: { S: email },
    },
  };
  try {
    const dc = ddbClient();
    const data = await dc.send(new GetItemCommand(params));
    console.info('Success', data.Item);
    if (data.Item && data.Item['email']) {
      const res: UserModel = {
        firstName: String(data.Item['firstName'].S),
        lastName: String(data.Item['lastName'].S),
        email: String(data.Item['email'].S),
        password: String(data.Item['password'].S),
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
