import axios from 'axios';
import { SignUpInputModel } from '../../components/templates/SignUpTemplate';

/**
 * AWS Cognitoのユーザープールに新規ユーザーを登録する
 * @param item - 登録するユーザーの情報
 * @returns ユーザー登録処理結果 {boolean}
 */
export const addUser = async (item: SignUpInputModel): Promise<boolean> => {
  console.info('SignUp開始');
  const backHost = process.env.REACT_APP_BACKEND_HOST;
  let resFlg = false;
  await axios
    .post(backHost + '/user', { item })
    .then((res) => {
      console.info(res);
      resFlg = true;
      // console.info(res.data);
    })
    .catch((err) => {
      console.info(err);
    });
  return resFlg;
};

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

/**
 * ログインAPI実行
 * @param userName - ユーザー名（メアド）
 * @param password - パスワード
 * @returns ユーザー情報 {UserModel | undefined}
 */
export const login = async (
  userName: string,
  password: string
): Promise<UserModel | undefined> => {
  console.info('login開始');
  let resData: UserModel | undefined;
  const backHost = process.env.REACT_APP_BACKEND_HOST;
  await axios
    .post(backHost + '/login', { userId: userName, password: password })
    .then((res) => {
      console.info('login終了');
      console.info(res);
      resData = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        role: 'role',
      };
    })
    .catch((err) => {
      console.info(err);
      resData = undefined;
    });
  return resData;
};

/**
 * ログアウト
 * @returns ログアウト結果 {boolean}
 */
export const logout = async (): Promise<boolean> => {
  console.info('logout開始');
  const backHost = process.env.REACT_APP_BACKEND_HOST;
  let resFlg = false;
  await axios
    .delete(backHost + '/logout', { data: { userId: '1s1h1o9@gmail.com' } })
    .then((res) => {
      console.info(res);
      console.info('logout終了');
      resFlg = true;
    })
    .catch((err) => {
      console.info(err);
    });
  return resFlg;
};

/**
 * ログイン中のユーザー情報取得
 * @returns ユーザー情報 {UserModel | undefined}
 */
export const getUserData = async (): Promise<UserModel | undefined> => {
  console.info('getUserData開始');
  const backHost = process.env.REACT_APP_BACKEND_HOST;
  let resData: UserModel | undefined;
  await axios
    .get(backHost + '/user/' + '1s1h1o9@gmail.com')
    .then((res) => {
      console.info(res);
      console.info('getUserData終了');
      resData = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        role: 'role',
      };
    })
    .catch((err) => {
      console.info(err);
      resData = undefined;
    });
  return resData;
};
