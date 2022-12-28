import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { PasswordInput, Paper, TextInput, Button, Loader, Text, Title, Container } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons';

import { useForm } from '@mantine/form';


interface LoginFormProps{
  setOpenedLogin:(value: React.SetStateAction<boolean>) => void,
  setOpenedSignup:(value: React.SetStateAction<boolean>) => void,
  setOpenedRegistration:(value: React.SetStateAction<boolean>) => void,
}

export function LoginForm(props:LoginFormProps){
  let navigate = useNavigate();
  const [email, setemail] = React.useState("")
  const [pass, setPass] = React.useState("")
  const [isOk, setIsOk] = React.useState(false)
  const [reloading, setReloading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [loginError, setLoginError] = React.useState("")
  
  const form = useForm({
    initialValues: {
      email: email,
      password: pass,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  React.useEffect(() => {
    if((pass.length != 0 )&&(email.length != 0)){
      setIsOk(true)
    } else {
      setIsOk(false)
    }
  },[email, pass])

  const sendRequest = () => {
    setIsError(false)
    setLoginError("")
    setReloading(true)
    axios
    .post('/api/login', {username: email, password: pass})
    .then((res) => {
      if(res.status == 200){
        localStorage.setItem('auth_token', res.data.data.token)
        props.setOpenedLogin(false);
        props.setOpenedRegistration(false);
        props.setOpenedSignup(false);
      }
      setReloading(false)
    })
    .catch((e)=>{
      setLoginError(" ")
      setReloading(false)
      setIsError(true)
    });
  }

  return(
    <>
      <Container className='wrapper'>
          <h3 className='title'>Log In</h3>
          <Text className='info-text'>Please input your Login details to gain access.</Text>
          <form onSubmit={form.onSubmit((values)=> console.log(values))}>
            <TextInput
              // icon={<IconUser size={16} color={"#228be6"} />}
              placeholder="Your email"
              label=""
              className='text-input'
              value={email}
              variant="filled"
              radius="xl"
              size='md'
              required
              onChange={(e)=>{setemail(e.currentTarget.value); setIsError(false); setLoginError("")}}
              error={loginError}
              />
            {isError && 
            <Text className='info-text error-text'>Incorrect email or password</Text>
            }
            <PasswordInput
              label=""
              placeholder="Your password"
              // icon={<IconLock size={16} color={"#228be6"}/>}
              variant="filled"
              radius="xl"
              size='md'
              className='text-input'
              required
              value={pass}
              onChange={(e)=>{setPass(e.currentTarget.value); setIsError(false); setLoginError("")}}
              error={loginError}
              />
            <Text className='info-text forgot-password'>Forget your <a href="#">email</a> or <a href="#">password</a> ?</Text>
          {!reloading && !isOk && 
            <Button className='submit-button' type='submit'>
              Log in  
            </Button>
          }
          {!reloading && isOk &&
            <Button onClick={sendRequest} className='submit-button' type='submit'>
              Log in  
            </Button>
          }
          {reloading && isOk &&
            <Button loading className='submit-button'>
            </Button>
          }
          </form>
          <Text className='info-text forgot-password'>
            New to here?{'\u00A0'}
            <a href="#" 
              onClick={(e)=> {
                e.preventDefault(); 
                props.setOpenedLogin(false); 
                props.setOpenedSignup(true);
              }}
            >
              Sign up
            </a>
            </Text>
      </Container>
    </>
  )
}
