import { useState, useContext, useEffect, useCallback } from 'react';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app, appAuth } from '../../config/firebase';
import { SidepanelContext } from '../../context/Sidepanel';
import { IForm, IDefaultInput, IUserData } from '../../interfaces';
import { SidePanelContainer, SidePanelTitle } from './styled';

const addUserFields: IDefaultInput[] = [
  {
    name: 'displayName',
    label: 'Nome',
    type: 'text',
    placeholder: 'Nome do utilizador',
    value: ''
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Email do utilizador',
    value: ''
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    placeholder: 'Password do utilizador'
  }
];

const AddUserForm = () => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

  const onAddUserHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      const res = await appAuth.createUserWithEmailAndPassword(
        data['email'],
        data['password']
      );

      if (!res || !res.user) {
        throw new Error('Could not complete signup');
      }

      await res.user.updateProfile({ displayName: data['displayName'] });

      app.collection('users').doc(res.user.uid).set({
        email: data['email'],
        nome: data['displayName']
      });

      onCloseSidepanelHandler();
    },
    [onCloseSidepanelHandler]
  );

  return (
    <SidePanelContainer>
      <SidePanelTitle>Adicionar utilizador</SidePanelTitle>
      <Form fields={addUserFields} onSubmitCallback={onAddUserHandler} />
    </SidePanelContainer>
  );
};

export const Users = () => {
  const [users, setUsers] = useState<IUserData[]>([]);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const onOpenUserFormHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <AddUserForm />,
      width: 'large'
    });
  };

  useEffect(() => {
    app.collection('users').onSnapshot((querySnapshot) => {
      const users: IUserData[] = [];

      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          nome: doc.data().nome,
          email: doc.data().email,
          admistrador: doc.data().admistrador ? 'Sim' : 'Não'
        });
      });

      setUsers(users);
    });
  }, []);
  return (
    <>
      <button onClick={onOpenUserFormHandler}>Adicionar Utilizador</button>
      <Table
        count={0}
        data={users}
        onTableRenderCallback={() => {}}
        onSearchCallback={() => {}}
        filterOptions={[]}
        tableActions={[]}
      />
    </>
  );
};
