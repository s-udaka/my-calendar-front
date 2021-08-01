import Amplify, { Auth } from 'aws-amplify';
import { SignUpInputModel } from '../../components/templates/SignUpTemplate';

// Amplifyの設定
Amplify.configure({
  Auth: {
    // リージョン
    region: process.env.REACT_APP_DB_REGION,
    // ユーザプールのID
    userPoolId: process.env.REACT_APP_AWS_COGNITO_POOL_ID,
    // アプリクライアントID
    userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
  },
});

/**
 * AWS Cognitoのユーザープールに新規ユーザーを登録する
 * @param item - 登録するユーザーの情報
 * @returns ユーザー登録処理結果 {boolean}
 */
export const addUser = async (item: SignUpInputModel): Promise<boolean> => {
  console.info('SignUp開始');
  try {
    const res = await Auth.signUp({
      username: item.email,
      password: item.password,
      attributes: {
        email: item.email,
      },
    });
    console.info(res);
    console.info('SignUp終了');
    return true;
  } catch (err) {
    console.info('catchに入った');
    console.error(err);
    return false;
  }
};

/**
 * 認証コード検証
 * @param userName - SignUp時に登楼したユーザーネーム
 * @param code - メールで届いた確認コード
 * @returns 認証コード検証結果 {boolean}
 */
export const confirmSignUp = async (
  userName: string,
  code: string
): Promise<boolean> => {
  console.info('confirmSignUp開始');
  try {
    const res = await Auth.confirmSignUp(userName, code);
    console.info(res);
    console.info('confirmSignUp終了');
    return true;
  } catch (err) {
    console.info('catchに入った');
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
 * ログイン
 * @param userName - 登録したユーザーネーム
 * @param password - 登録したパスワード
 * @returns ログイン結果 {boolean}
 */
export const getUser = async (
  userName: string,
  password: string
): Promise<UserModel | undefined> => {
  console.info('signIn開始');
  try {
    const res = await Auth.signIn(userName, password);
    console.info(res);
    console.info('signIn終了');
    if (res) {
      const resData: UserModel = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
      };
      return resData;
    } else {
      return undefined;
    }
  } catch (err) {
    console.info('catchに入った');
    console.error(err);
    return undefined;
  }
};

/**
 * ログアウト
 * @returns ログアウト結果 {boolean}
 */
export const signOut = async (): Promise<boolean> => {
  console.info('signOut開始');
  try {
    const res = await Auth.signOut();
    console.info(res); // 成功してもundefinedだった
    console.info('signOut終了');
    return true;
  } catch (err) {
    console.info('catchに入った');
    console.error(err);
    return false;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUserData = async () => {
  try {
    const res = await Auth.currentAuthenticatedUser();
    console.info(res);
  } catch (err) {
    console.info('catchに入った');
    console.error(err);
  }
};

// const cognitoClient = () => {
//     return new CognitoUserPool({
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         UserPoolId: process.env.REACT_APP_AWS_COGNITO_POOL_ID!,
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID!,
//     });
// };

// /**
//  * ユーザーテーブルに新規ユーザーを登録する
//  * @param args - 登録するユーザーの情報
//  * @returns ユーザー登録処理結果 {boolean}
//  */
//  export const addUser = async (item: SignUpInputModel): Promise<boolean> => {
//     const attributeList = [
//         new CognitoUserAttribute({
//           Name: "email",
//           Value: item.email,
//         }),
//     ];
//     console.info('SignUp開始');
//     try {
//       const cc = cognitoClient();
//       cc.signUp(item.email, item.password, attributeList, [],
//         (err) => {
//             if (err) {
//                 console.error(err);
//                 return false;
//             }
//         });
//         console.info('SignUp終了');
//         return true;
//     } catch (err) {
//         console.info('catchに入った');
//         console.error(err);
//         return false;
//     }
//   };
