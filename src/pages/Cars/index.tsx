import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app, appTimestamp } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  CarsData,
  IForm,
  IInput,
  ITable,
  ITableAction
} from '../../interfaces';
import {
  AdminHeaderContainer,
  AdminTitleContainer,
  BurgerIconButton
} from '../../styles';
import { SidePanelContainer } from '../Users/styled';

type AdminOutletContext = {
  toggleAdminNavbar: () => void;
};

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

const SIDEPANEL_WIDTH = '500px';

const AddCarsFrom = ({ callback }: { callback: () => void }) => {
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const onAddCartHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      onLoadingHandler(true);
      await app
        .collection('cars')
        .add({ ...data, date: appTimestamp.fromDate(new Date()) })
        .then(() => {
          app
            .collection('counters')
            .doc('cars')
            .get()
            .then(async (doc) => {
              let count = (doc?.data()?.count || 0) + 1;

              await app.collection('counters').doc('cars').set({ count });

              callback();
            });
        })
        .catch(() => {
          onLoadingHandler(false);
          toast.error('Ocorreu um erro ao adicionar o carro.');
        });

      onCloseSidepanelHandler(SIDEPANEL_WIDTH);
    },
    [callback, onCloseSidepanelHandler, onLoadingHandler]
  );

  return (
    <SidePanelContainer>
      <Form
        title="Adicionar carro"
        fields={addCarsForm}
        onSubmitCallback={onAddCartHandler}
      />
    </SidePanelContainer>
  );
};

export const Cars: FC = () => {
  const { toggleAdminNavbar } = useOutletContext<AdminOutletContext>();
  const [cars, setCars] = useState<CarsData[]>([]);
  const [carsCounter, setCarsCounter] = useState(0);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const callback = () => {
    onLoadingHandler(true);
    const carsData: CarsData[] = [];

    app
      .collection('cars')
      .orderBy('date', 'desc')
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          carsData.push({
            id: doc.id,
            matricula: doc.data().matricula,
            viatura: doc.data().viatura
          });
          app
            .collection('counters')
            .doc('cars')
            .get()
            .then((docs) => {
              if (!docs.exists) {
                onLoadingHandler(false);
                return;
              }

              setCarsCounter(docs.data()?.count);
              setCars(carsData);
              onLoadingHandler(false);
            })
            .catch(() => {
              onLoadingHandler(false);
              toast.error('Ocorreu um erro. Tente de novo mais tarde.');
            });
        });
      })
      .catch(() => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro. Tente de novo mais tarde.');
      });
  };

  const onOpenCarsFormHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <AddCarsFrom callback={callback} />,
      sidepanelWidth: SIDEPANEL_WIDTH
    });
  };

  const onRemoveCarsHandler = useCallback<ITableAction<CarsData>['callback']>(
    (rowData, currentPage) => {
      onLoadingHandler(true);
      const carsData: CarsData[] = [];

      app
        .collection('cars')
        .doc(rowData.id)
        .delete()
        .then(() => {
          app
            .collection('counters')
            .doc('cars')
            .get()
            .then(async (doc) => {
              let count = (doc?.data()?.count || 0) - 1;

              await app.collection('counters').doc('cars').set({ count });

              let page = currentPage;

              if (currentPage > 1) {
                page = page - 1;
              }
              if (carsData.length === 1) {
                page = page - 1;
              }

              if (currentPage === 1) {
                app
                  .collection('cars')
                  .orderBy('date', 'desc')
                  .limit(10)
                  .get()
                  .then((docs) => {
                    if (docs.empty) {
                      onLoadingHandler(false);
                      return;
                    }

                    docs.forEach((doc) => {
                      carsData.push({
                        id: doc.id,
                        matricula: doc.data().matricula,
                        viatura: doc.data().viatura
                      });
                    });

                    setCarsCounter((prevData) => prevData - 1);
                    setCars(carsData);
                    onLoadingHandler(false);
                  })
                  .catch(() => {
                    onLoadingHandler(false);
                    toast.error('Ocorreu um erro. Tente de novo mais tarde.');
                  });
              } else {
                const currentLimit = page * 10;

                app
                  .collection('cars')
                  .orderBy('date', 'desc')
                  .limit(currentLimit)
                  .get()
                  .then((documentSnapshots) => {
                    const lastVisible =
                      documentSnapshots.docs[documentSnapshots.docs.length - 1];

                    app
                      .collection('cars')
                      .orderBy('date', 'desc')
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

                        setCarsCounter((prev) => prev - 1);
                        setCars(carsData);
                        onLoadingHandler(false);
                      })
                      .catch(() => {
                        onLoadingHandler(false);
                        toast.error(
                          'Ocorreu um erro. Tente de novo mais tarde.'
                        );
                      });
                  });
              }
            })
            .catch(() => {
              onLoadingHandler(false);
              toast.error('Ocorreu um erro. Tente de novo mais tarde.');
            });
        });
    },
    [onLoadingHandler]
  );

  const onPageChangeHandler = useCallback<
    ITable<CarsData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      onLoadingHandler(true);
      const carsData: CarsData[] = [];

      if (page === 1) {
        app
          .collection('cars')
          .orderBy('date', 'desc')
          .limit(10)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              carsData.push({
                id: doc.id,
                matricula: doc.data().matricula,
                viatura: doc.data().viatura
              });
            });

            setCars(carsData);
            onLoadingHandler(false);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente de novo mais tarde.');
          });
      } else {
        const currentLimit = (page - 1) * 10;

        app
          .collection('cars')
          .orderBy('date', 'desc')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('cars')
              .orderBy('date', 'desc')
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
              })
              .catch(() => {
                onLoadingHandler(false);
                toast.error('Ocorreu um erro. Tente de novo mais tarde.');
              });
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente de novo mais tarde.');
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
      .orderBy('date', 'desc')
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          carsData.push({
            id: doc.id,
            matricula: doc.data().matricula,
            viatura: doc.data().viatura
          });
          app
            .collection('counters')
            .doc('cars')
            .get()
            .then((onSnapshot) => {
              onLoadingHandler(false);
              setCarsCounter(onSnapshot.data()?.count);
              setCars(carsData);
            })
            .catch(() => {
              onLoadingHandler(false);
              toast.error('Ocorreu um erro. Tente de novo mais tarde.');
            });
        });
      })
      .catch(() => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro. Tente de novo mais tarde.');
      });
  }, [onLoadingHandler]);

  return (
    <>
      <AdminHeaderContainer>
        <AdminTitleContainer>
          <BurgerIconButton onClick={toggleAdminNavbar}>
            <GiHamburgerMenu size={26} color="#157416" />
          </BurgerIconButton>
          <h1>Carros</h1>
        </AdminTitleContainer>
        <Button type="primary" onClick={onOpenCarsFormHandler}>
          Adicionar
        </Button>
      </AdminHeaderContainer>
      <Table
        count={carsCounter}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={onPageChangeHandler}
        data={cars}
        filterOptions={[]}
        tableActions={[{ callback: onRemoveCarsHandler, icon: <FaTrash /> }]}
      />
    </>
  );
};
