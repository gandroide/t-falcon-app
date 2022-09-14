import { useCallback, useContext, useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app, appTimestamp } from '../../config/firebase';
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

const AddClientsFrom = ({
  onAddClientsCallback
}: {
  onAddClientsCallback: (count: number) => void;
}) => {
  const { onLoadingHandler } = useContext(LoadingContext);
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

  const onAddClientHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      onLoadingHandler(true);
      app
        .collection('clients')
        .add({ ...data, date: appTimestamp.fromDate(new Date()) })
        .then(() => {
          app
            .collection('counters')
            .doc('clients')
            .get()
            .then(async (doc) => {
              let count = (doc?.data()?.count || 0) + 1;

              await app.collection('counters').doc('clients').set({ count });
              onAddClientsCallback(count);
              onCloseSidepanelHandler();
            });
        });
    },
    [onCloseSidepanelHandler, onAddClientsCallback, onLoadingHandler]
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
      SidepanelChildren: (
        <AddClientsFrom onAddClientsCallback={onAddClientsCallback} />
      ),
      sidepanelWidth: '500px'
    });
  };

  const onAddClientsCallback = (count: number) => {
    const clientsData: ClientsData[] = [];

    app
      .collection('clients')
      .orderBy('date', 'desc')
      .limit(10)
      .get()
      .then((docs) => {
        if (docs.empty) {
          return;
        }

        docs.forEach((doc) => {
          clientsData.push({
            id: doc.id,
            nome: doc.data().name
          });
        });

        setClientsCounter(count);
        setClients(clientsData);
        onLoadingHandler(false);
      });
  };

  const onRemoveClientHandler = useCallback<
    ITableAction<ClientsData>['callback']
  >(
    (rowData, currentPage) => {
      onLoadingHandler(true);

      app
        .collection('clients')
        .doc(rowData.id)
        .delete()
        .then(() => {
          app
            .collection('counters')
            .doc('clients')
            .get()
            .then(async (doc) => {
              let count = doc?.data()?.count - 1;

              await app.collection('counters').doc('clients').set({ count });

              app
                .collection('clients')
                .orderBy('date', 'desc')
                .limit(10)
                .get()
                .then((docs) => {
                  const clientsData: ClientsData[] = [];

                  if (docs.empty) {
                    return;
                  }

                  docs.forEach((doc) => {
                    clientsData.push({
                      id: doc.id,
                      nome: doc.data().name
                    });
                  });

                  setClients(clientsData);
                  setClientsCounter(count);
                  onLoadingHandler(false);
                });
            });
        });
    },
    [onLoadingHandler]
  );

  const onPageChangeHandler = useCallback<
    ITable<ClientsData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      onLoadingHandler(true);
      const clientsData: ClientsData[] = [];

      if (page === 1) {
        app
          .collection('clients')
          .orderBy('data', 'desc')
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
          .orderBy('data', 'desc')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('clients')
              .orderBy('data', 'desc')
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
      .orderBy('data', 'desc')
      .limit(10)
      .get()
      .then((docs) => {
        if (docs.empty) {
          return;
        }

        docs.forEach((doc) => {
          clientsData.push({
            id: doc.id,
            nome: doc.data().name
          });
        });

        app
          .collection('counters')
          .doc('clients')
          .get()
          .then((docs) => {
            if (!docs.exists) return;

            setClientsCounter(docs.data()?.count);
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
