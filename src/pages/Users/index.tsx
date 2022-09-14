import { useState, useContext, useEffect, useCallback } from 'react';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app, app2 } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import { IForm, IDefaultInput, IUserData, ITable } from '../../interfaces';
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
  },
  {
    name: 'admistrador',
    label: 'admistrador',
    type: 'checkbox',
    checked: false
  }
];

const AddUserForm = () => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const onAddUserHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      const res = await app2.createUserWithEmailAndPassword(
        data['email'],
        data['password']
      );

      if (!res || !res.user) {
        throw new Error('Could not complete signup');
      }

      await res.user.updateProfile({ displayName: data['displayName'] });

      app
        .collection('users')
        .doc(res.user.uid)
        .set({
          email: data['email'],
          nome: data['displayName'],
          admistrador: data['admistrador'] === 'true'
        });

      app2.signOut();
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
  const [usersCounter, setUsersCounter] = useState(0);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);
  const onOpenUserFormHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <AddUserForm />,
      sidepanelWidth: '500px'
    });
  };

  useEffect(() => {
    onLoadingHandler(true);
    const usersData: IUserData[] = [];

    app
      .collection('users')
      .orderBy('date', 'desc')
      .limit(10)
      .get()
      .then((docs) => {
        if (docs.empty) {
          return;
        }

        docs.forEach((doc) => {
          usersData.push({
            id: doc.id,
            nome: doc.data().nome,
            email: doc.data().email,
            admistrador: doc.data().admistrador ? 'Sim' : 'Não'
          });
        });

        app
          .collection('counters')
          .doc('users')
          .get()
          .then((docs) => {
            if (!docs.exists) return;

            setUsersCounter(docs.data()?.count);
            setUsers(usersData);
            onLoadingHandler(false);
          });
      });
  }, [onLoadingHandler]);

  const onPageChangeHandler = useCallback<
    ITable<IUserData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      onLoadingHandler(true);
      const usersData: IUserData[] = [];

      if (page === 1) {
        app
          .collection('users')
          .orderBy('date', 'desc')
          .limit(10)
          .onSnapshot((onSnapshot) => {
            if (onSnapshot.empty) return;

            onSnapshot.forEach((doc) => {
              usersData.push({
                id: doc.id,
                nome: doc.data().nome,
                email: doc.data().email,
                admistrador: doc.data().admistrador ? 'Sim' : 'Não'
              });
            });

            setUsers(usersData);
            onLoadingHandler(false);
          });
      } else {
        const currentLimit = (page - 1) * 10;

        app
          .collection('users')
          .orderBy('date', 'desc')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('users')
              .orderBy('date', 'desc')
              .startAfter(lastVisible)
              .limit(10)
              .get()
              .then((data) => {
                if (data.empty) return;

                data.forEach((doc) => {
                  usersData.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    email: doc.data().email,
                    admistrador: doc.data().admistrador ? 'Sim' : 'Não'
                  });
                });

                setUsers(usersData);
                onLoadingHandler(false);
              });
          });
      }
    },
    [onLoadingHandler]
  );

  return (
    <>
      <button onClick={onOpenUserFormHandler}>Adicionar Utilizador</button>
      <Table
        count={usersCounter}
        data={users}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={() => {}}
        filterOptions={[]}
        tableActions={[]}
      />
    </>
  );
};
