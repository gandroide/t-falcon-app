import { useCallback, useContext } from 'react';
import { Form } from '../../components/Form';
import { AuthContext } from '../../context/Auth';
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
  const { onLoginHandler } = useContext(AuthContext);
  const onSubmitLoginHandler = useCallback<IForm['onSubmitCallback']>(
    (fields) => {
      onLoginHandler({ email: fields['email'], password: fields['password'] });
    },
    [onLoginHandler]
  );

  return (
    <Container>
      <CircularContainer>
        <InitialImage src="./tfalcon.jpg" style={{ width: '100%' }} alt="" />
      </CircularContainer>
      <Form fields={loginUserFields} onSubmitCallback={onSubmitLoginHandler} />
    </Container>
  );
};
