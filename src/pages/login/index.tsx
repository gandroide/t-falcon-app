import React, { useCallback } from 'react';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { appAuth } from '../../config/firebase';
import { IForm, IInput } from '../../interfaces';
import { CircularContainer, Container, InitialImage } from './Login.styles';

const loginUserFields: IInput[] = [
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Introduza o seu email',
    type: 'text',
    value: ''
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Introduza a sua password',
    type: 'password',
    value: ''
  }
];

export const Login = () => {
  const onLoginHandler = useCallback<IForm['onSubmitCallback']>(
    async (fields) => {
      const user = await appAuth.signInWithEmailAndPassword(
        fields['email'],
        fields['password']
      );
      console.log(user);
    },
    []
  );

  return (
    <Container>
      <CircularContainer>
        <InitialImage src="./tfalcon.jpg" style={{ width: '100%' }} alt="" />
      </CircularContainer>
      <Form fields={loginUserFields} onSubmitCallback={onLoginHandler} />
    </Container>
  );
};
