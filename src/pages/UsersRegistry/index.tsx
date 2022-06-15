import moment from 'moment';
import { useState, useCallback, useEffect } from 'react';
import { SearchFilter } from '../../components/SearchFilter';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { FullUserRegistryData, ISearchFilter } from '../../interfaces';

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
  const [usersRegistry, setUsersRegistry] = useState<FullUserRegistryData[]>(
    []
  );

  const onSearchCallback = useCallback<ISearchFilter['onSearchCallback']>(
    (filter, value) => {
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
    },
    []
  );

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registo picagens dos utilizadores</h1>
      <SearchFilter
        options={[
          { label: 'Utilizador', value: 'displayName', name: 'displayName' }
        ]}
        onSearchCallback={onSearchCallback}
      />
      <Table
        count={0}
        onPageChangeCallback={() => {}}
        data={usersRegistry}
        tableActions={[]}
      />
    </div>
  );
};
