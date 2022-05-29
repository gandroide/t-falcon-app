import React from 'react';
import { Button } from '../../components/Button';
import { CircularContainer, Container, InitialImage } from './Login.styles';

export const Login = () => {
  return (
    <Container>
      <CircularContainer>
        <InitialImage src="./tfalcon.jpg" style={{ width: '100%' }} alt="" />
      </CircularContainer>
      <h3>Sign In</h3>
      <Container>
        <label htmlFor="">Email</label>
        <input type="text" />
      </Container>
      <Container>
        <label htmlFor="">Password</label>
        <input type="password" />
      </Container>
      <Container>
        <Button>Sign in</Button>
      </Container>
    </Container>
  );
};
