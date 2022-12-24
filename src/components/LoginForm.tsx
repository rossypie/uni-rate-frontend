import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { PasswordInput, Paper, TextInput, Button, Loader, Text, Title, Container } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons';


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
      
    <div className='auth'>
      <Container style={{textAlign:'center'}}>
        <Paper shadow="xs" radius="lg" p="xl" className='wrapper'>
          <h2 style={{color:"#228be6"}}>Welcome Back</h2>
          <Text className='info-text' style={{marginBottom:20, marginTop:5}}>Please input your Login details to gain access.</Text>
          <TextInput
            icon={<IconUser size={16} color={"#228be6"} />}
            placeholder="Your username"
            label=""
            className='text-input'
            withAsterisk
            value={username}
            variant="unstyled"
            size='md'
            onChange={(e)=>setUsername(e.currentTarget.value)}
            />
          <PasswordInput
            label=""
            placeholder="Your password"
            icon={<IconLock size={16} color={"#228be6"}/>}
            variant="unstyled"
            size='md'
            className='text-input'
            withAsterisk
            value={pass}
            onChange={(e)=>setPass(e.currentTarget.value)}
            />
          {!reloading && !isOk && 
            <Button className='submit-button disabled' disabled>
              Log in  
            </Button>
          }
          {!reloading && isOk &&
            <Button onClick={sendRequest} className='submit-button'>
              Log in  
            </Button>
          }
          {reloading && isOk &&
            <Button loading className='submit-button'>
            </Button>
          }
        </Paper>
        {/* <Text className='footer-password'>Forgot your password?  <Link to={"/"}>Reset Password</Link></Text> */}
      </Container>

    </div>
    </>
  )
}
