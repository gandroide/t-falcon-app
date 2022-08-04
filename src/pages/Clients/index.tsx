import { useCallback, useContext, useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  IDefaultInput,
  IForm,
  ITable,
  ITableAction,
  ClientsData
} from '../../interfaces';
import { AdminContainer, AdminHeaderContainer } from '../../styles';
import { SidePanelContainer, SidePanelTitle } from '../Users/styled';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LoadingContext } from '../../context/Loading';

const addClientForm: IDefaultInput[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Cliente',
    placeholder: 'Introduza o nome do client',
    value: ''
  }
];

const AddClientsFrom = () => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

  const onAddClientHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      await app
        .collection('clients')
        .add(data)
        .then(() => {
          app
            .collection('counters')
            .doc('clients')
            .get()
            .then(async (doc) => {
              let count = (doc?.data()?.count || 0) + 1;

              await app.collection('counters').doc('clients').set({ count });
            });
        });

      onCloseSidepanelHandler();
    },
    [onCloseSidepanelHandler]
  );

  return (
    <SidePanelContainer>
      <SidePanelTitle>Adicionar cliente</SidePanelTitle>
      <Form fields={addClientForm} onSubmitCallback={onAddClientHandler} />
    </SidePanelContainer>
  );
};

export const Clients = () => {
  const [clients, setClients] = useState<ClientsData[]>([]);
  const [clientsCounter, setClientsCounter] = useState(0);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const onOpenClientFormHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <AddClientsFrom />,
      sidepanelWidth: '500px'
    });
  };

  const onRemoveClientHandler = useCallback<
    ITableAction<ClientsData>['callback']
  >((rowData) => {}, []);

  const onPageChangeHandler = useCallback<
    ITable<ClientsData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      console.log(page, filter, filterValue);
      onLoadingHandler(true);
      const clientsData: ClientsData[] = [];

      if (page === 1) {
        app
          .collection('clients')
          .orderBy('name')
          .limit(10)
          .onSnapshot((onSnapshot) => {
            if (onSnapshot.empty) return;

            onSnapshot.forEach((doc) => {
              clientsData.push({
                id: doc.id,
                nome: doc.data().name
              });
            });

            setClients(clientsData);
            onLoadingHandler(false);
          });
      } else {
        const currentLimit = (page - 1) * 10;

        app
          .collection('clients')
          .orderBy('name')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('clients')
              .orderBy('name')
              .startAfter(lastVisible)
              .limit(10)
              .get()
              .then((data) => {
                if (data.empty) return;

                data.forEach((doc) => {
                  clientsData.push({
                    id: doc.id,
                    nome: doc.data().name
                  });
                });

                setClients(clientsData);
                onLoadingHandler(false);
              });
          });
      }
    },
    [onLoadingHandler]
  );

  useEffect(() => {
    onLoadingHandler(true);
    const clientsData: ClientsData[] = [];

    app
      .collection('clients')
      .orderBy('name')
      .limit(10)
      .onSnapshot((onSnapshot) => {
        if (onSnapshot.empty) return;

        onSnapshot.forEach((doc) => {
          clientsData.push({
            id: doc.id,
            nome: doc.data().name
          });
        });

        app
          .collection('counters')
          .doc('clients')
          .onSnapshot((onSnapshot) => {
            if (!onSnapshot.exists) return;

            setClientsCounter(onSnapshot.data()?.count);
            setClients(clientsData);
            onLoadingHandler(false);
          });
      });
  }, [onLoadingHandler]);

  return (
    <AdminContainer>
      <AdminHeaderContainer>
        <h1>Registo dos clientes</h1>
        <button onClick={onOpenClientFormHandler}>Adicionar cliente</button>
      </AdminHeaderContainer>
      <Table
        count={clientsCounter}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={onPageChangeHandler}
        filterOptions={[]}
        data={clients}
        tableActions={[
          { callback: onRemoveClientHandler, icon: <FaRegTrashAlt /> }
        ]}
      />
    </AdminContainer>
  );
};
