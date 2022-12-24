import React, { useEffect, useState } from 'react';
import {Helmet} from 'react-helmet';

import { Center, Container} from '@mantine/core';

import { LoginForm } from '../../components/LoginForm';

import { ReactComponent as LoginSvg } from '../../assets/svg/illusts/login.svg';


const Login = () => {
  const [bgcolor, setBgColor] = useState<String>("#79BFF9")

  useEffect(()=>{
    var con = localStorage.getItem("theme")=="light" ? setBgColor("black") : "#79BFF9"
  },[])

  return (
    <div>
    <Helmet>
      <style>{`body { background-color: ${bgcolor}; }`}</style>
    </Helmet>
      <Center style={{ width: "100%", height: 750 }} >
          <LoginForm />
      </Center>
    </div>
  );
}
 
export default Login;