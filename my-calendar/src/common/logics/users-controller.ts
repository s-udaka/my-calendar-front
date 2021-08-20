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
