import moment from 'moment';
import { useState, useCallback, useEffect } from 'react';
import { SearchFilter } from '../../components/SearchFilter';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { useFilter } from '../../hooks/useFilter';
import { FullUserRegistryData, ITableAction } from '../../interfaces';
import { RiMapPinUserFill, RiMapPinUserLine } from 'react-icons/ri';
import { Map } from '../../components/Map';

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

export const UsersRegistry = () => {
  const { filter, value, onChangeFilterHandler } = useFilter();
  const [usersRegistry, setUsersRegistry] = useState<FullUserRegistryData[]>(
    []
  );

  const onSearchCallback = useCallback(() => {
    if (!filter || !value) return;

    app
      .collection('user_registry')
      .where(filter, '==', value)
      .get()
      .then((docs) => {
        const userRegistryData: FullUserRegistryData[] = [];

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
            saida: leaveTime ?? '-'
          });
        });

        setUsersRegistry(userRegistryData);
      });
  }, [filter, value]);

  useEffect(() => {
    app.collection('user_registry').onSnapshot((onSnapshot) => {
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
    <div style={{ padding: '2rem' }}>
      <h1>Registo picagens dos utilizadores</h1>
      <SearchFilter
        options={[
          { label: 'Utilizador', value: 'displayName', name: 'displayName' }
        ]}
        onSearchCallback={onSearchCallback}
        onChangeFilterCallback={onChangeFilterHandler}
        filterValue={value}
      />
      <Table
        count={0}
        onPageChangeCallback={() => {}}
        data={usersRegistry}
        tableActions={[{ icon: <RiMapPinUserFill />, callback: openMap }]}
      />
    </div>
  );
};
