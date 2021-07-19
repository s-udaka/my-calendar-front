import React, { useEffect } from 'react';
import { useLocation, RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router';
import {
  HeaderTemplate,
  HeaderTemplateProps,
} from '../templates/HeaderTemplate';
import { CalendarTemplate } from '../templates/CalendarTemplate';

const Home: React.FC<RouteComponentProps> = () => {
  const history = useHistory();
  const location = useLocation<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>();
  const userInfo = location.state;
  useEffect(() => {
    console.log('HomeのuseEffectが実行されました');
    console.log(userInfo);
  });

  const handleOnClickLogout = () => {
    history.push('/');
  };

  const HeaderProps: HeaderTemplateProps = {
    title: 'Food Calendar',
    events: {
      onClickLogout: handleOnClickLogout,
    },
  };

  return (
    <div>
      <HeaderTemplate {...HeaderProps} />
      <CalendarTemplate />
    </div>
  );
};

export default Home;
