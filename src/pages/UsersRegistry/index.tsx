import moment from 'moment';
import { useState, useCallback, useEffect, useContext } from 'react';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
// import { useFilter } from '../../hooks/useFilter';
import { FullUserRegistryData, ITable, ITableAction } from '../../interfaces';
import { RiMapPinUserFill } from 'react-icons/ri';
import { Map } from '../../components/Map';
import { AdminContainer, AdminHeaderContainer } from '../../styles';
import { SidepanelContext } from '../../context/Sidepanel';
import { LoadingContext } from '../../context/Loading';
import * as xlsx from 'xlsx';

const secondsToDate = (seconds?: number) => {
  if (seconds) {
    return new Date(seconds * 1000);
  }
};

const formattedDate = (date?: Date) => {
  if (date) {
    return moment(date).format('DD-MM-YYYY');
  }
};

const formattedTime = (date?: Date) => {
  if (date) {
    return moment(date).format('HH:mm');
  }
};

export const UsersRegistry = () => {
  // const { filter, value } = useFilter();
  const [usersRegistry, setUsersRegistry] = useState<FullUserRegistryData[]>(
    []
  );
  const [userRegistryCounter, setUserRegistryCounter] = useState(0);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);
  // const onSearchCallback = useCallback(() => {
  //   if (!filter || !value) return;

  //   app
  //     .collection('user_registry')
  //     .where(filter, '==', value)
  //     .get()
  //     .then((docs) => {
  //       const userRegistryData: FullUserRegistryData[] = [];

  //       docs.forEach((doc) => {
  //         const entry = secondsToDate(doc.data().entryDate?.seconds);
  //         const leave = secondsToDate(doc.data().leaveDate?.seconds);
  //         const date = formattedDate(entry);
  //         const entryTime = formattedTime(entry);
  //         const leaveTime = formattedTime(leave);
  //         userRegistryData.push({
  //           id: doc.id,
  //           nome: doc.data().displayName,
  //           data: date ?? '-',
  //           entrada: entryTime ?? '-',
  //           saida: leaveTime ?? '-',
  //           latitude_entry: doc.data().latitude_entry,
  //           longitude_entry: doc.data().longitude_entry,
  //           latitude_out: doc.data().latitude_out,
  //           longitude_out: doc.data().longitude_out
  //         });
  //       });

  //       setUsersRegistry(userRegistryData);
  //     });
  // }, [filter, value]);

  useEffect(() => {
    onLoadingHandler(true);
    const userRegistryData: FullUserRegistryData[] = [];

    app
      .collection('user_registry')
      .orderBy('entryDate', 'desc')
      .limit(10)
      .get()
      .then((docs) => {
        if (docs.empty) {
          return;
        }

        docs.forEach((doc) => {
          const entry = secondsToDate(doc.data().entryDate?.seconds);
          const leave = secondsToDate(doc.data().leaveDate?.seconds);
          const date = formattedDate(entry);
          const entryTime = formattedTime(entry);
          const leaveTime = formattedTime(leave);
          userRegistryData.push({
            id: doc.id,
            nome: doc.data().displayName,
            data: date ?? '-',
            entrada: entryTime ?? '-',
            saida: leaveTime ?? '-',
            latitude_entry: doc.data().latitude_entry,
            longitude_entry: doc.data().longitude_entry,
            latitude_out: doc.data().latitude_out,
            longitude_out: doc.data().longitude_out
          });
        });

        app
          .collection('counters')
          .doc('user_registry')
          .get()
          .then((docs) => {
            if (!docs.exists) return;

            setUserRegistryCounter(docs.data()?.count);
            setUsersRegistry(userRegistryData);
            onLoadingHandler(false);
          });
      });
  }, [onLoadingHandler]);

  const openMap = useCallback<ITableAction<FullUserRegistryData>['callback']>(
    (rowData) => {
      onOpenSidepanelHandler({
        isOpen: true,
        SidepanelChildren: (
          <Map
            position={{
              latitude: rowData.latitude_entry,
              longitude: rowData.longitude_entry
            }}
          />
        ),
        sidepanelWidth: '1000px'
      });
    },
    [onOpenSidepanelHandler]
  );

  const onPageChangeHandler = useCallback<
    ITable<FullUserRegistryData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      onLoadingHandler(true);
      const registryData: FullUserRegistryData[] = [];

      if (page === 1) {
        app
          .collection('user_registry')
          .orderBy('entryDate', 'desc')
          .limit(10)
          .onSnapshot((onSnapshot) => {
            if (onSnapshot.empty) return;

            onSnapshot.forEach((doc) => {
              const entry = secondsToDate(doc.data().entryDate?.seconds);
              const leave = secondsToDate(doc.data().leaveDate?.seconds);
              const date = formattedDate(entry);
              const entryTime = formattedTime(entry);
              const leaveTime = formattedTime(leave);
              registryData.push({
                id: doc.id,
                nome: doc.data().displayName,
                data: date ?? '-',
                entrada: entryTime ?? '-',
                saida: leaveTime ?? '-',
                latitude_entry: doc.data().latitude_entry,
                longitude_entry: doc.data().longitude_entry,
                latitude_out: doc.data().latitude_out,
                longitude_out: doc.data().longitude_out
              });
            });

            setUsersRegistry(registryData);
            onLoadingHandler(false);
          });
      } else {
        const currentLimit = (page - 1) * 10;

        app
          .collection('user_registry')
          .orderBy('entryDate', 'desc')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('user_registry')
              .orderBy('entryDate', 'desc')
              .startAfter(lastVisible)
              .limit(10)
              .get()
              .then((data) => {
                if (data.empty) return;

                data.forEach((doc) => {
                  const entry = secondsToDate(doc.data().entryDate?.seconds);
                  const leave = secondsToDate(doc.data().leaveDate?.seconds);
                  const date = formattedDate(entry);
                  const entryTime = formattedTime(entry);
                  const leaveTime = formattedTime(leave);
                  registryData.push({
                    id: doc.id,
                    nome: doc.data().displayName,
                    data: date ?? '-',
                    entrada: entryTime ?? '-',
                    saida: leaveTime ?? '-',
                    latitude_entry: doc.data().latitude_entry,
                    longitude_entry: doc.data().longitude_entry,
                    latitude_out: doc.data().latitude_out,
                    longitude_out: doc.data().longitude_out
                  });
                });

                setUsersRegistry(registryData);
                onLoadingHandler(false);
              });
          });
      }
    },
    [onLoadingHandler]
  );

  // console.log(userRegistryCounter);

  const onExportHandler = () => {
    const registryData: FullUserRegistryData[] = [];

    app
      .collection('user_registry')
      .orderBy('entryDate', 'desc')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const entry = secondsToDate(doc.data().entryDate?.seconds);
          const leave = secondsToDate(doc.data().leaveDate?.seconds);
          const date = formattedDate(entry);
          const entryTime = formattedTime(entry);
          const leaveTime = formattedTime(leave);
          registryData.push({
            id: doc.id,
            nome: doc.data().displayName,
            data: date ?? '-',
            entrada: entryTime ?? '-',
            saida: leaveTime ?? '-',
            latitude_entry: doc.data().latitude_entry,
            longitude_entry: doc.data().longitude_entry,
            latitude_out: doc.data().latitude_out,
            longitude_out: doc.data().longitude_out
          });
        });

        const initialsPicagem = registryData[0].data;

        const newBook = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(registryData);
        xlsx.utils.book_append_sheet(newBook, ws, `pacagens${initialsPicagem}`);
        xlsx.writeFile(newBook, `picages${initialsPicagem}.xlsx`);
      });
  };

  return (
    <AdminContainer>
      <AdminHeaderContainer>
        <h1>Registo picagens dos utilizadores</h1>
        <button onClick={onExportHandler}>Exportar</button>
      </AdminHeaderContainer>
      <Table
        count={userRegistryCounter}
        onTableRenderCallback={onPageChangeHandler}
        onSearchCallback={() => {}}
        filterOptions={[
          { label: 'Utilizador', value: 'displayName', name: 'displayName' }
        ]}
        data={usersRegistry}
        tableActions={[{ icon: <RiMapPinUserFill />, callback: openMap }]}
      />
    </AdminContainer>
  );
};
