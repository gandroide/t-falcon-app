import { useState, useContext, useEffect, useCallback, FC } from 'react';
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

type IFormAddUser = {
  callback: () => void;
};

const SIDEPANEL_WIDTH = '500px';

const AddUserForm: FC<IFormAddUser> = ({ callback }) => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const onAddUserHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      onLoadingHandler(true);
      const res = await app2
        .createUserWithEmailAndPassword(data['email'], data['password'])
        .catch((e) => {
          if (e.code === 'auth/email-already-in-use') {
            toast.error('Endereço de email já se encontra registado.');
          }
          onLoadingHandler(false);
        });

      if (!res || !res.user) {
        toast.error(
          'Não foi possível criar utilizador. Tente de novo mais tarde.'
        );
        onLoadingHandler(false);
        return;
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
              callback();
              app2.signOut();
            })
            .catch(() => {
              onLoadingHandler(false);
              toast.error('Ocorreu um erro ao criar o utilizador.');
            });
        })
        .catch(() => {
          onLoadingHandler(false);
          toast.error('Ocorreu um erro ao criar o utilizador.');
        });
    },
    [onCloseSidepanelHandler, callback, onLoadingHandler]
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
      SidepanelChildren: <AddUserForm callback={callback} />,
      sidepanelWidth: SIDEPANEL_WIDTH
    });
  };

  const callback = useCallback(() => {
    const usersData: IUserData[] = [];

    app
      .collection('users')
      .orderBy('date', 'desc')
      .where('isActive', '==', true)
      .limit(10)
      .get()
      .then((docs) => {
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
            onLoadingHandler(false);
            setUsersCounter(docs.data()?.count);
            setUsers(usersData);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde');
          });
      })
      .catch(() => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro. Tente novamente mais tarde');
      });
  }, [onLoadingHandler]);

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
            setUsersCounter(docs.data()?.count);
            setUsers(usersData);
            onLoadingHandler(false);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde');
          });
      })
      .catch(() => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro. Tente novamente mais tarde');
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
          .where('isActive', '==', true)
          .limit(10)
          .get()
          .then((docs) => {
            if (docs.empty) return;

            docs.forEach((doc) => {
              usersData.push({
                id: doc.id,
                nome: doc.data().nome,
                email: doc.data().email,
                admistrador: doc.data().admistrador ? 'Sim' : 'Não'
              });
            });

            setUsers(usersData);
            onLoadingHandler(false);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde');
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
              })
              .catch(() => {
                onLoadingHandler(false);
                toast.error('Ocorreu um erro. Tente novamente mais tarde');
              });
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde');
          });
      }
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
          callback();
        })
        .catch(() => {
          toast.error('Ocorreu um erro ao eliminar o utilizador.');
        });
    },
    [onResetModalHandler, callback]
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
          Adicionar
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
