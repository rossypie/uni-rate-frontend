import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { PasswordInput } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons';
import { Button } from '@mantine/core';
import { Loader } from '@mantine/core';


export function LoginForm(){
  let navigate = useNavigate();
  const [username, setUsername] = React.useState("")
  const [pass, setPass] = React.useState("")
  const [isOk, setIsOk] = React.useState(false)
  const [reloading, setReloading] = React.useState(false)

  React.useEffect(() => {
    if((pass.length != 0 )&&(username.length != 0)){
      setIsOk(true)
    } else {
      setIsOk(false)
    }
  },[username, pass])

  const sendRequest = () => {
    setReloading(true)
    axios
    .post('/api/login', {username: username, password: pass})
    .then((res) => {
      if(res.status == 200){
        localStorage.setItem('auth_token', res.data.data.token)
        navigate("/");
      }
      setReloading(false)
    })
    .catch((e)=>{
      console.log(e)
      setReloading(false)
    });
  }

  return(
    <>
      <TextInput
        icon={<IconUser size={16} />}
        placeholder="Your username"
        label="Username"
        className='text-input'
        withAsterisk
        value={username}
        onChange={(e)=>setUsername(e.currentTarget.value)}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        icon={<IconLock size={16} />}
        className='text-input'
        withAsterisk
        value={pass}
        onChange={(e)=>setPass(e.currentTarget.value)}
      />
      {!reloading && !isOk && 
        <Button disabled>
          Login  
        </Button>
      }
      {!reloading && isOk &&
        <Button onClick={sendRequest}>
          Login  
        </Button>
      }
      {reloading && isOk &&
        <Button loading>
          Login
        </Button>
      }
    </>
  )
}
