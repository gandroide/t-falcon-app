import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { LoadingContext } from '../../context/Loading';
import { ITable, ITableAction, UserRegistryData } from '../../interfaces';
import { PageContainer } from './styled';

const secondsToDate = (seconds?: number) => {
  if (seconds) {
    return new Date(seconds * 1000);
  }
};

const formattedDate = (date?: Date) => {
  if (date) {
    return moment(date).format('L');
  }
};

const formattedTime = (date?: Date) => {
  if (date) {
    return moment(date).format('LT');
  }
};

export const UserRegistry = () => {
  const { user } = useContext(AuthContext);
  const [userRegistry, setUserRegistry] = useState<UserRegistryData[]>([]);
  const [userRegistryCounter, setUserRegistryCounter] = useState(0);
  const { onLoadingHandler } = useContext(LoadingContext);

  const getUserRegistry = useCallback(
    (page: number, fromPagination: boolean) => {
      onLoadingHandler(true);
      const currentLimit = (page - 1) * 10;
      app
        .collection('user_registry')
        .orderBy('entryDate', 'desc')
        .limit(currentLimit || 10)
        .get()
        .then((documentSnapshots) => {
          let lastVisible;

          if (fromPagination && page !== 1) {
            lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];
          } else {
            lastVisible = documentSnapshots.docs[0];
          }

          app
            .collection('user_registry')
            .where('userId', '==', user.userId)
            .orderBy('entryDate', 'desc')
            .startAt(lastVisible)
            .limit(10)
            .get()
            .then((docs) => {
              if (docs.empty) return;

              const userRegistryData: UserRegistryData[] = [];

              docs.forEach((doc) => {
                const entry = secondsToDate(doc.data().entryDate?.seconds);
                const leave = secondsToDate(doc.data().leaveDate?.seconds);
                const date = formattedDate(entry);
                const entryTime = formattedTime(entry);
                const leaveTime = formattedTime(leave);
                userRegistryData.push({
                  id: doc.id,
                  data: date ?? '-',
                  entrada: entryTime ?? '-',
                  saida: leaveTime ?? '-'
                });
              });

              app
                .collection('users')
                .doc(user.userId!)
                .get()
                .then((docs) => {
                  onLoadingHandler(false);
                  if (!docs.exists) return;

                  setUserRegistryCounter(docs.data()?.user_registry_count);
                  setUserRegistry(userRegistryData);
                })
                .catch(() => {
                  onLoadingHandler(false);
                  toast.error(
                    'Ocorreu um erro inesperado. Tente mais tarde por favor.'
                  );
                });
            })
            .catch(() => {
              onLoadingHandler(false);
              toast.error(
                'Ocorreu um erro inesperado. Tente mais tarde por favor.'
              );
            });
        })
        .catch(() => {
          onLoadingHandler(false);
          toast.error(
            'Ocorreu um erro inesperado. Tente mais tarde por favor.'
          );
        });
    },
    [onLoadingHandler, user.userId]
  );

  const onPageChangeHandler = useCallback<
    ITable<UserRegistryData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      getUserRegistry(page, true);
    },
    [getUserRegistry]
  );

  const onDeleteRegistryHandler = useCallback<
    ITableAction<UserRegistryData>['callback']
  >(
    (rowData, currentPage) => {
      app
        .collection('user_registry')
        .doc(rowData.id)
        .delete()
        .then(() => {
          app
            .collection('counters')
            .doc('user_registry')
            .get()
            .then((doc) => {
              let count = (doc?.data()?.count || 0) - 1;

              app
                .collection('counters')
                .doc('user_registry')
                .set({ count })
                .catch(() => {
                  toast.error('Ocorreu um erro ao registar a picagem');
                })
                .then(() => {
                  app
                    .collection('users')
                    .doc(user.userId!)
                    .get()
                    .then((doc) => {
                      let count = (doc?.data()?.user_registry_count || 0) - 1;

                      app
                        .collection('users')
                        .doc(user.userId!)
                        .update({ user_registry_count: count })
                        .then(() => {
                          if (userRegistry.length === 1) {
                            getUserRegistry(currentPage - 1, true);
                          } else {
                            getUserRegistry(currentPage, true);
                          }
                        });
                    });
                });
            });
        });
    },
    [getUserRegistry, user.userId, userRegistry]
  );

  useEffect(() => {
    getUserRegistry(1, false);
  }, [getUserRegistry]);

  return (
    <PageContainer>
      <h1>Registos de Picagem</h1>
      <Table
        count={userRegistryCounter}
        data={userRegistry}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={() => {}}
        filterOptions={[]}
        tableActions={[
          { callback: onDeleteRegistryHandler, icon: <FaRegTrashAlt /> }
        ]}
      />
    </PageContainer>
  );
};
