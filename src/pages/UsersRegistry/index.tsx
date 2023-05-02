import moment from 'moment';
import { useState, useCallback, useEffect, useContext } from 'react';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { FullUserRegistryData, ITable, ITableAction } from '../../interfaces';
import { RiMapPinUserFill } from 'react-icons/ri';
import { Map } from '../../components/Map';
import {
  AdminHeaderButtonsContainer,
  AdminHeaderContainer,
  AdminTitleContainer,
  BurgerIconButton
} from '../../styles';
import { SidepanelContext } from '../../context/Sidepanel';
import { LoadingContext } from '../../context/Loading';
import * as xlsx from 'xlsx';
import { Button } from '../../components/Button';
import { ModalContext } from '../../context/Modal';
import _ from 'lodash';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useOutletContext } from 'react-router-dom';

type AdminOutletContext = {
  toggleAdminNavbar: () => void;
};

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
  const { toggleAdminNavbar } = useOutletContext<AdminOutletContext>();
  const [usersRegistry, setUsersRegistry] = useState<FullUserRegistryData[]>(
    []
  );
  const [userRegistryCounter, setUserRegistryCounter] = useState(0);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onLoadingHandler } = useContext(LoadingContext);
  const { onSetModalHandler } = useContext(ModalContext);

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

  const deletePicagensHandler = async () => {
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
  };

  const onConfirmDeleteHandler = () => {
    onSetModalHandler({
      isOpen: true,
      type: 'info',
      title: 'Eliminar picagens',
      description:
        'Clique no botão confirmar que pretende eliminar as picagens. Se não exportou os dados, deverá fazê-lo pois esta acção é irreversível.',
      onConfirmCallback: () => deletePicagensHandler(),
      onCloseCallback: null
    });
  };

  return (
    <>
      <AdminHeaderContainer column={true}>
        <AdminTitleContainer>
          <BurgerIconButton onClick={toggleAdminNavbar}>
            <GiHamburgerMenu size={26} color="#157416" />
          </BurgerIconButton>
          <h1>Picagens</h1>
        </AdminTitleContainer>
        <AdminHeaderButtonsContainer>
          <Button type="secondary" onClick={onConfirmDeleteHandler}>
            Eliminar picagens
          </Button>
          <Button type="primary" onClick={onExportHandler}>
            Exportar
          </Button>
        </AdminHeaderButtonsContainer>
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
    </>
  );
};
