import { Container } from '@mantine/core';

import { LoginForm } from '../../components/LoginForm';

const Login = () => {
  return (
    <>
     <Container size="xs" px="xs">
      <LoginForm /> 
     </Container>
    </>
  );
}
 
export default Login;