import { useCallback, useContext, useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import { FaTrash } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  IServiceReportData,
  IServiceReportFull,
  ITable,
  ITableAction
} from '../../interfaces';
import {
  AdminHeaderButtonsContainer,
  AdminHeaderContainer,
  AdminTitleContainer,
  BurgerIconButton
} from '../../styles';
import { ServicesReportDetail } from '../ServicesReportDetails';
import { Button } from '../../components/Button';
import { ModalContext } from '../../context/Modal';
import _ from 'lodash';
import { useOutletContext } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';
import { toast } from 'react-toastify';

type AdminOutletContext = {
  toggleAdminNavbar: () => void;
};

export const Reports = () => {
  const { toggleAdminNavbar } = useOutletContext<AdminOutletContext>();
  const [reports, setReports] = useState<IServiceReportFull[]>([]);
  const [reportsCounter, setReportsCounter] = useState(0);
  const { onLoadingHandler } = useContext(LoadingContext);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onSetModalHandler } = useContext(ModalContext);

  const onReportHandler = useCallback<
    ITableAction<IServiceReportData>['callback']
  >(
    (rowData) => {
      const reportItem = reports.find((report) => report.id === rowData.id)!;

      onOpenSidepanelHandler({
        isOpen: true,
        SidepanelChildren: <ServicesReportDetail report={reportItem} />,
        sidepanelWidth: '800px'
      });
    },
    [reports, onOpenSidepanelHandler]
  );

  const onPageChangeHandler = useCallback<
    ITable<IServiceReportFull>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      onLoadingHandler(true);
      const reportsData: IServiceReportFull[] = [];

      if (page === 1) {
        app
          .collection('reports')
          .orderBy('data', 'desc')
          .limit(10)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              reportsData.push({
                id: doc.id,
                colaborador: doc.data().utilizador,
                cliente: doc.data()['localização'],
                data: doc.data().data,
                ave: doc.data().ave,
                viatura: doc.data().carro,
                'hora-fim': doc.data()['hora-fim'],
                'hora-inicio': doc.data()['hora-inicio'],
                observacoes: doc.data()['observações']
              });
            });

            setReports(reportsData);
            onLoadingHandler(false);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde.');
          });
      } else {
        const currentLimit = (page - 1) * 10;

        app
          .collection('reports')
          .orderBy('data', 'desc')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('reports')
              .orderBy('data', 'desc')
              .startAfter(lastVisible)
              .limit(10)
              .get()
              .then((docs) => {
                if (docs.empty) return;

                docs.forEach((doc) => {
                  reportsData.push({
                    id: doc.id,
                    colaborador: doc.data().utilizador,
                    cliente: doc.data()['localização'],
                    data: doc.data().data,
                    ave: doc.data().ave,
                    viatura: doc.data().carro,
                    'hora-fim': doc.data()['hora-fim'],
                    'hora-inicio': doc.data()['hora-inicio'],
                    observacoes: doc.data()['observações']
                  });
                });

                setReports(reportsData);
                onLoadingHandler(false);
              })
              .catch(() => {
                onLoadingHandler(false);
                toast.error('Ocorreu um erro. Tente novamente mais tarde.');
              });
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde.');
          });
      }
    },
    [onLoadingHandler]
  );

  const onRemoveReportHandler = useCallback<
    ITableAction<IServiceReportData>['callback']
  >(
    (rowData, currentPage) => {
      onLoadingHandler(true);
      const reportsData: IServiceReportFull[] = [];

      app
        .collection('reports')
        .doc(rowData.id)
        .delete()
        .then(() => {
          app
            .collection('counters')
            .doc('reports')
            .get()
            .then(async (doc) => {
              let count = (doc?.data()?.count || 0) - 1;

              await app.collection('counters').doc('reports').set({ count });

              let page = currentPage;

              if (currentPage > 1) {
                page = page - 1;
              }
              if (reportsData.length === 1) {
                page = page - 1;
              }

              if (currentPage === 1) {
                app
                  .collection('reports')
                  .orderBy('data', 'desc')
                  .limit(10)
                  .get()
                  .then((docs) => {
                    docs.forEach((doc) => {
                      reportsData.push({
                        id: doc.id,
                        colaborador: doc.data().utilizador,
                        cliente: doc.data()['localização'],
                        data: doc.data().data,
                        ave: doc.data().ave,
                        viatura: doc.data().carro,
                        'hora-fim': doc.data()['hora-fim'],
                        'hora-inicio': doc.data()['hora-inicio'],
                        observacoes: doc.data()['observações']
                      });
                    });

                    setReportsCounter((prevData) => prevData - 1);
                    setReports(reportsData);
                    onLoadingHandler(false);
                  })
                  .catch(() => {
                    onLoadingHandler(false);
                    toast.error('Ocorreu um erro. Tente novamente mais tarde.');
                  });
              } else {
                const currentLimit = page * 10;

                app
                  .collection('reports')
                  .orderBy('data', 'desc')
                  .limit(currentLimit)
                  .get()
                  .then((documentSnapshots) => {
                    const lastVisible =
                      documentSnapshots.docs[documentSnapshots.docs.length - 1];

                    app
                      .collection('reports')
                      .orderBy('data', 'desc')
                      .startAfter(lastVisible)
                      .limit(10)
                      .get()
                      .then((data) => {
                        data.forEach((doc) => {
                          reportsData.push({
                            id: doc.id,
                            colaborador: doc.data().utilizador,
                            cliente: doc.data()['localização'],
                            data: doc.data().data,
                            ave: doc.data().ave,
                            viatura: doc.data().carro,
                            'hora-fim': doc.data()['hora-fim'],
                            'hora-inicio': doc.data()['hora-inicio'],
                            observacoes: doc.data()['observações']
                          });
                        });
                        onLoadingHandler(false);
                        setReportsCounter((prev) => prev - 1);
                        setReports(reportsData);
                      })
                      .catch(() => {
                        onLoadingHandler(false);
                        toast.error(
                          'Ocorreu um erro. Tente novamente mais tarde.'
                        );
                      });
                  })
                  .catch(() => {
                    onLoadingHandler(false);
                    toast.error('Ocorreu um erro. Tente novamente mais tarde.');
                  });
              }
            });
        });
    },
    [onLoadingHandler]
  );

  useEffect(() => {
    onLoadingHandler(true);
    const reportsData: IServiceReportFull[] = [];

    app
      .collection('reports')
      .orderBy('data', 'desc')
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          reportsData.push({
            id: doc.id,
            colaborador: doc.data().utilizador,
            cliente: doc.data()['localização'],
            data: doc.data().data,
            ave: doc.data().ave,
            viatura: doc.data().carro,
            'hora-fim': doc.data()['hora-fim'],
            'hora-inicio': doc.data()['hora-inicio'],
            observacoes: doc.data()['observações']
          });
        });

        app
          .collection('counters')
          .doc('reports')
          .get()
          .then((docs) => {
            const currentCount = docs.data()?.count ?? 0;

            setReportsCounter(currentCount);
            setReports(reportsData);
            onLoadingHandler(false);
          })
          .catch(() => {
            onLoadingHandler(false);
          });
      })
      .catch(() => {
        onLoadingHandler(false);
      });
  }, [onLoadingHandler]);

  const data: IServiceReportData[] = reports.map((report) => ({
    id: report.id,
    colaborador: report.colaborador,
    cliente: report.cliente,
    data: report.data
  }));

  const onExportHandler = () => {
    const reportsData: IServiceReportFull[] = [];

    app
      .collection('reports')
      .orderBy('data', 'desc')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          reportsData.push({
            id: doc.id,
            colaborador: doc.data().utilizador,
            cliente: doc.data()['localização'],
            data: doc.data().data,
            ave: doc.data().ave,
            viatura: doc.data().carro,
            'hora-fim': doc.data()['hora-fim'],
            'hora-inicio': doc.data()['hora-inicio'],
            observacoes: doc.data()['observações']
          });
        });

        const initialsReports = reportsData[0].data;

        const newBook = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(reportsData);
        xlsx.utils.book_append_sheet(
          newBook,
          ws,
          `relatorio_${initialsReports}`
        );
        xlsx.writeFile(newBook, `relatorio_${initialsReports}.xlsx`);
      });
  };

  const deleteReportsHandler = async () => {
    onLoadingHandler(true);
    const snapshot = await app.collection('reports').get();
    const MAX_WRITES_PER_BATCH = 500;

    const batches = _.chunk(snapshot.docs, MAX_WRITES_PER_BATCH);

    const commitBatchPromises: any[] = [];

    batches.forEach((batch) => {
      const writeBatch = app.batch();
      batch.forEach((doc) => writeBatch.delete(doc.ref));
      commitBatchPromises.push(writeBatch.commit());
    });

    await Promise.all(commitBatchPromises);
    onPageChangeHandler({ page: 1, filter: '', filterValue: '' });
  };

  const onConfirmDeleteHandler = () => {
    onSetModalHandler({
      isOpen: true,
      type: 'info',
      title: 'Eliminar relatórios',
      description:
        'Clique no botão confirmar para confirmar que pretende eliminar os relatórios. Se não exportou os dados, deverá fazê-lo pois esta acção é irreversível.',
      onConfirmCallback: () => deleteReportsHandler(),
      onCloseCallback: null
    });
  };

  return (
    <>
      <AdminHeaderContainer column>
        <AdminTitleContainer column>
          <BurgerIconButton onClick={toggleAdminNavbar}>
            <GiHamburgerMenu size={26} color="#157416" />
          </BurgerIconButton>
          <h1>Relatórios</h1>
        </AdminTitleContainer>
        <AdminHeaderButtonsContainer>
          <Button type="secondary" onClick={onConfirmDeleteHandler}>
            Eliminar relatórios
          </Button>
          <Button type="primary" onClick={onExportHandler}>
            Exportar
          </Button>
        </AdminHeaderButtonsContainer>
      </AdminHeaderContainer>
      <Table
        count={reportsCounter}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={() => {}}
        filterOptions={[]}
        data={data}
        tableActions={[
          { callback: onReportHandler, icon: <IoDocument /> },
          { callback: onRemoveReportHandler, icon: <FaTrash /> }
        ]}
      />
    </>
  );
};
