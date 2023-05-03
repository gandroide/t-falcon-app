import { useState, useContext, useEffect, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app, app2 } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { ModalContext } from '../../context/Modal';
import { SidepanelContext } from '../../context/Sidepanel';
import { IForm, IDefaultInput, IUserData, ITable } from '../../interfaces';
import {
  AdminHeaderContainer,
  AdminTitleContainer,
  BurgerIconButton
} from '../../styles';
import { SidePanelContainer } from './styled';

type AdminOutletContext = {
  toggleAdminNavbar: () => void;
};

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

const SIDEPANEL_WIDTH = '500px';

const AddUserForm = () => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

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
          admistrador: data['admistrador'] === 'true',
          isActive: true,
          date: new Date()
        })
        .then(() => {
          app
            .collection('counters')
            .doc('users')
            .get()
            .then(async (doc) => {
              let count = (doc?.data()?.count || 0) + 1;

              await app.collection('counters').doc('users').set({ count });
              onCloseSidepanelHandler(SIDEPANEL_WIDTH);
              // callback();
              app2.signOut();
            });
        });

      // onCloseSidepanelHandler(SIDEPANEL_WIDTH);
    },
    [onCloseSidepanelHandler]
  );

  return (
    <SidePanelContainer>
      <Form
        title="Adicionar utilizador"
        fields={addUserFields}
        onSubmitCallback={onAddUserHandler}
      />
    </SidePanelContainer>
  );
};

export const Users = () => {
  const { toggleAdminNavbar } = useOutletContext<AdminOutletContext>();
  const [users, setUsers] = useState<IUserData[]>([]);
  const [usersCounter, setUsersCounter] = useState(0);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);
  const { onSetModalHandler, onResetModalHandler } = useContext(ModalContext);
  const onOpenUserFormHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <AddUserForm />,
      sidepanelWidth: SIDEPANEL_WIDTH
    });
  };

  useEffect(() => {
    onLoadingHandler(true);
    const usersData: IUserData[] = [];

    app
      .collection('users')
      .orderBy('date', 'desc')
      .where('isActive', '==', true)
      .limit(10)
      .get()
      .then((docs) => {
        if (docs.empty) {
          return;
        }
        console.log(docs);
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
              .where('isActive', '==', true)
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

  const getUsersByPage = useCallback(
    (page: number) => {
      const usersData: IUserData[] = [];
      const currentLimit = (page - 1) * 10;

      let query = app
        .collection('users')
        .orderBy('date', 'desc')
        .where('isActive', '==', true);

      if (page !== 1) {
        query = query.limit(currentLimit);
      }

      query.get().then((documentSnapshots) => {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        app
          .collection('users')
          .orderBy('date', 'desc')
          .where('isActive', '==', true)
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
    },
    [onLoadingHandler]
  );

  const onDeleteUser = useCallback(
    (userId: string, currentPage: number) => {
      app
        .collection('users')
        .doc(userId)
        .update({ isActive: false })
        .then(() => {
          onResetModalHandler();
          toast.success('Utilizador eliminado com sucesso!');
          getUsersByPage(currentPage);
        });
    },
    [onResetModalHandler, getUsersByPage]
  );

  const onConfirmDeleteHandler = useCallback(
    (rowData, currentPage) => {
      onSetModalHandler({
        isOpen: true,
        type: 'info',
        title: 'Eliminar utilizadfor',
        description: 'Tem a certeza que pretende eliminar o utilizador?',
        onConfirmCallback: () => onDeleteUser(rowData.id, currentPage),
        onCloseCallback: null
      });
    },
    [onDeleteUser, onSetModalHandler]
  );

  return (
    <>
      <AdminHeaderContainer>
        <AdminTitleContainer>
          <BurgerIconButton onClick={toggleAdminNavbar}>
            <GiHamburgerMenu size={26} color="#157416" />
          </BurgerIconButton>
          <h1>Utilizadores</h1>
        </AdminTitleContainer>
        <Button type="primary" onClick={onOpenUserFormHandler}>
          Adicionar Utilizador
        </Button>
      </AdminHeaderContainer>
      <Table
        count={usersCounter}
        data={users}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={() => {}}
        filterOptions={[]}
        tableActions={[
          {
            icon: <FaTrash />,
            callback: onConfirmDeleteHandler
          }
        ]}
      />
    </>
  );
};
