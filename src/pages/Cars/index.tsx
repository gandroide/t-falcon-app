import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  CarsData,
  IForm,
  IInput,
  ITable,
  ITableAction
} from '../../interfaces';
import { AdminContainer, AdminHeaderContainer } from '../../styles';
import { SidePanelContainer, SidePanelTitle } from '../Users/styled';

const addCarsForm: IInput[] = [
  {
    name: 'matricula',
    type: 'text',
    label: 'Matricula',
    placeholder: 'Introduza matricula',
    value: ''
  },
  {
    name: 'viatura',
    type: 'text',
    label: 'Viatura',
    placeholder: 'Introduza o nome da viatura',
    value: ''
  }
];

const AddCarsFrom = () => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

  const onAddCartHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      await app
        .collection('cars')
        .add(data)
        .then(() => {
          app
            .collection('counters')
            .doc('cars')
            .get()
            .then(async (doc) => {
              let count = (doc?.data()?.count || 0) + 1;

              await app.collection('counters').doc('cars').set({ count });
            });
        });

      onCloseSidepanelHandler();
    },
    [onCloseSidepanelHandler]
  );

  return (
    <SidePanelContainer>
      <SidePanelTitle>Adicionar carro</SidePanelTitle>
      <Form fields={addCarsForm} onSubmitCallback={onAddCartHandler} />
    </SidePanelContainer>
  );
};

export const Cars: FC = () => {
  const [cars, setCars] = useState<CarsData[]>([]);
  const [carsCounter, setCarsCounter] = useState(0);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const onOpenCarsFormHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <AddCarsFrom />,
      sidepanelWidth: '500px'
    });
  };

  const onRemoveCarsHandler = useCallback<ITableAction<CarsData>['callback']>(
    (rowData) => {},
    []
  );

  const onPageChangeHandler = useCallback<
    ITable<CarsData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      onLoadingHandler(true);
      const carsData: CarsData[] = [];

      if (page === 1) {
        app
          .collection('carros')
          .orderBy('name')
          .limit(10)
          .onSnapshot((onSnapshot) => {
            onLoadingHandler(false);

            if (onSnapshot.empty) return;

            onSnapshot.forEach((doc) => {
              carsData.push({
                id: doc.id,
                matricula: doc.data().matricula,
                viatura: doc.data().viatura
              });
            });

            setCars(carsData);
          });
      } else {
        const currentLimit = (page - 1) * 10;

        app
          .collection('cars')
          .orderBy('name')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('cars')
              .orderBy('name')
              .startAfter(lastVisible)
              .limit(10)
              .get()
              .then((data) => {
                if (data.empty) return;

                data.forEach((doc) => {
                  carsData.push({
                    id: doc.id,
                    matricula: doc.data().matricula,
                    viatura: doc.data().viatura
                  });
                });

                setCars(carsData);
                onLoadingHandler(false);
              });
          });
      }
    },
    [onLoadingHandler]
  );

  useEffect(() => {
    onLoadingHandler(true);
    const carsData: CarsData[] = [];

    app
      .collection('cars')
      .orderBy('matricula')
      .limit(10)
      .onSnapshot((onSnapshot) => {
        if (onSnapshot.empty) {
          onLoadingHandler(false);
          return;
        }

        onSnapshot.forEach((doc) => {
          carsData.push({
            id: doc.id,
            matricula: doc.data().matricula,
            viatura: doc.data().viatura
          });
        });

        app
          .collection('counters')
          .doc('cars')
          .onSnapshot((onSnapshot) => {
            if (!onSnapshot.exists) {
              onLoadingHandler(false);
              return;
            }

            setCarsCounter(onSnapshot.data()?.count);
            setCars(carsData);
            onLoadingHandler(false);
          });
      });
  }, [onLoadingHandler]);

  return (
    <AdminContainer>
      <AdminHeaderContainer>
        <h1>Registo dos carros</h1>
        <button onClick={onOpenCarsFormHandler}>Adicionar carro</button>
      </AdminHeaderContainer>
      <Table
        count={carsCounter}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={onPageChangeHandler}
        data={cars}
        filterOptions={[]}
        tableActions={[
          { callback: onRemoveCarsHandler, icon: <FaRegTrashAlt /> }
        ]}
      />
    </AdminContainer>
  );
};
