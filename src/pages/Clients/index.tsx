import { useCallback, useContext, useEffect, useState } from 'react';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { SidepanelContext } from '../../context/Sidepanel';
import { IDefaultInput, IForm, ITable } from '../../interfaces';
import { AdminContainer, AdminHeaderContainer } from '../../styles';
import { SidePanelContainer, SidePanelTitle } from '../Users/styled';

interface ClientsData {
  id: string;
  nome: string;
}

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

  const onOpenClientFormHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <AddClientsFrom />
    });
  };

  const onPageChangehandler = useCallback<
    ITable<ClientsData>['onPageChangeCallback']
  >((page) => {
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

              console.log(clientsData);

              setClients(clientsData);
            });
        });
    }
  }, []);

  useEffect(() => {
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
          });
      });
  }, []);

  return (
    <AdminContainer>
      <AdminHeaderContainer>
        <h1>Registo dos clientes</h1>
        <button onClick={onOpenClientFormHandler}>Adicionar cliente</button>
      </AdminHeaderContainer>
      <Table
        count={clientsCounter}
        onPageChangeCallback={onPageChangehandler}
        data={clients}
        tableActions={[]}
      />
    </AdminContainer>
  );
};
