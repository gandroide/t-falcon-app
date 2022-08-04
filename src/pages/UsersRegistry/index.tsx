import moment from 'moment';
import { useState, useCallback, useEffect } from 'react';
import { SearchFilter } from '../../components/SearchFilter';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { useFilter } from '../../hooks/useFilter';
import { FullUserRegistryData, ITable, ITableAction } from '../../interfaces';
import { RiMapPinUserFill, RiMapPinUserLine } from 'react-icons/ri';
import { Map } from '../../components/Map';
import { AdminContainer, AdminHeaderContainer } from '../../styles';

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
  const [usersRegistry, setUsersRegistry] = useState<FullUserRegistryData[]>(
    []
  );

  const onPageChangeCallback = useCallback<
    ITable<FullUserRegistryData>['onTableRenderCallback']
  >(({ page, filter, filterValue }) => {
    const query = app
      .collection('user_registry')
      .where(filter, '==', filterValue)
      .orderBy('entryDate', 'desc');

    if (page === 1) {
      query
        .limit(2)
        .get()
        .then((onSnapshot) => {
          if (onSnapshot.empty) return;

          onSnapshot.forEach((doc) => {
            console.log(doc.data());
          });
        });
    } else {
      const currentLimit = (page - 1) * 10;

      query
        .limit(currentLimit)
        .get()
        .then((documentSnapshots) => {
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];

          query
            .startAfter(lastVisible)
            .limit(10)
            .get()
            .then((data) => {
              if (data.empty) return;

              data.forEach((doc) => {
                console.log(doc.data());
              });
            });
        });
    }
  }, []);

  useEffect(() => {
    app
      .collection('user_registry')
      .orderBy('entryDate', 'desc')
      .onSnapshot((onSnapshot) => {
        if (onSnapshot.empty) return;

        const userRegistryData: FullUserRegistryData[] = [];

        onSnapshot.forEach((doc) => {
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
            saida: leaveTime ?? '-'
          });
        });

        setUsersRegistry(userRegistryData);
      });
  }, []);

  const openMap = useCallback(() => {
    <Map position={{ latitude: 32.6743899, longitude: -17.0636638 }} />;
  }, []);

  return (
    <AdminContainer>
      <AdminHeaderContainer>
        <h1>Registo picagens dos utilizadores</h1>
      </AdminHeaderContainer>
      <Table
        count={0}
        onTableRenderCallback={onPageChangeCallback}
        onSearchCallback={onPageChangeCallback}
        filterOptions={[
          { label: 'Utilizador', value: 'displayName', name: 'displayName' }
        ]}
        data={usersRegistry}
        tableActions={[{ icon: <RiMapPinUserFill />, callback: openMap }]}
      />
    </AdminContainer>
  );
};
