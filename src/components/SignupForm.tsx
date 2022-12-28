import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { PasswordInput, Paper, TextInput, Button, Loader, Text, Title, Container } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons';

import { useForm } from '@mantine/form';

interface SignupFormProps{
    setOpenedSignup:(value: React.SetStateAction<boolean>) => void,
    setOpenedLogin:(value: React.SetStateAction<boolean>) => void,
    setOpenedRegistration:(value: React.SetStateAction<boolean>) => void,
  }
  
export function SignUpForm(props:SignupFormProps){
    let navigate = useNavigate();
    const [username, setUsername] = React.useState("")
    const [email, setemail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [passAgain, setPassAgain] = React.useState("")
    const [isOk, setIsOk] = React.useState(false)
    const [reloading, setReloading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const [formError, setFormError] = React.useState("")
    const [passwordDidntMatch, setPasswordDidntMatch] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState("")
    
    const form = useForm({
      initialValues: {
        username: username,
        email: email,
        password: pass,
        passwordAgain: passAgain,
      },
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
    })
  
    React.useEffect(() => {
      if(
        (pass.length != 0 )&&
        (email.length != 0)&&
        (passAgain.length != 0)&&
        (username.length != 0)
        ){
        setIsOk(true)
      } else {
        setIsOk(false)
      }
    },[email, pass, passAgain, username])
  
    React.useEffect(()=>{
      if ((passAgain != "")&&(passAgain != pass)){
        setPasswordDidntMatch(true)
        setPasswordError(" ")
      } else {
        setPasswordDidntMatch(false)
        setPasswordError("")
      }
    },[passAgain, pass])

    const sendRequest = () => {
      setIsError(false)
      setFormError("")
      setReloading(true)
      axios
      .post('/api/register', {username: username, email:email, password: pass, password2: passAgain})
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
        setFormError(" ")
        setReloading(false)
        setIsError(true)
      });
    }
  
    return(
      <>
        <Container className='wrapper'>
            <h3 className='title'>Sign Up</h3>
            <Text className='info-text'>By setting a new account, you agree to our <a href="#">Account Policies</a></Text>
            <form onSubmit={form.onSubmit((values)=> console.log(values))}>
              <TextInput
                  // icon={<IconUser size={16} color={"#228be6"} />}
                  placeholder="Username"
                  label=""
                  className='text-input'
                  value={username}
                  variant="filled"
                  radius="xl"
                  size='md'
                  required
                  onChange={(e)=>{setUsername(e.currentTarget.value); setIsError(false); setFormError("")}}
                  error={formError}
                  />
              <TextInput
                // icon={<IconUser size={16} color={"#228be6"} />}
                placeholder="Email"
                label=""
                className='text-input'
                value={email}
                variant="filled"
                radius="xl"
                size='md'
                required
                onChange={(e)=>{setemail(e.currentTarget.value); setIsError(false); setFormError("")}}
                error={formError}
                />
              <PasswordInput
                label=""
                placeholder="Password"
                // icon={<IconLock size={16} color={"#228be6"}/>}
                variant="filled"
                radius="xl"
                size='md'
                className='text-input'
                required
                value={pass}
                onChange={(e)=>{setPass(e.currentTarget.value); setIsError(false); setFormError("")}}
                error={formError || passwordError}
                />
              {passwordDidntMatch && 
                <Text className='info-text error-text'>Passwords didnt match</Text>
              }
              <PasswordInput
                label=""
                placeholder="Again Password"
                // icon={<IconLock size={16} color={"#228be6"}/>}
                variant="filled"
                radius="xl"
                size='md'
                className='text-input'
                required
                value={passAgain}
                onChange={(e)=>{setPassAgain(e.currentTarget.value); setIsError(false); setFormError("")}}
                error={formError || passwordError}
                />
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
            <Text className='info-text forgot-password'>Already have an account?{'\u00A0'}
              <a href="#" 
                onClick={(e)=>{
                  e.preventDefault();
                  props.setOpenedSignup(false);
                  props.setOpenedLogin(true);
                }}
              >Log In
              </a>
            </Text>
        </Container>
      </>
    )
  }
  