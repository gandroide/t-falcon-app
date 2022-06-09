import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { UserRegistryData } from '../../interfaces';
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
  const [isLoading, setIsLoading] = useState(true);

  const getUserRegistry = useCallback(() => {
    app
      .collection('user_registry')
      .where('userId', '==', user.userId)
      .onSnapshot((onSnapshot) => {
        if (onSnapshot.empty) return;

        const userRegistryData: UserRegistryData[] = [];

        onSnapshot.forEach((doc) => {
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

        setUserRegistry(userRegistryData);
        setIsLoading(false);
      });
  }, [user.userId]);

  const onDeleteRegistryHandler = (rowData: UserRegistryData) => {
    app
      .collection('user_registry')
      .doc(rowData.id)
      .delete()
      .then(() => {
        const stateCopy = [...userRegistry];
        const itemIndex = stateCopy.findIndex(
          (registry) => registry.id === rowData.id
        );
        stateCopy.splice(itemIndex, 1);
        console.log(stateCopy);
        setUserRegistry(stateCopy);
      })
      .catch((e) => console.log('Error removind registry'));
  };

  useEffect(() => {
    getUserRegistry();
  }, [getUserRegistry]);

  return (
    <PageContainer>
      <h1>Registos de Picagem</h1>
      {isLoading || !userRegistry.length ? (
        <p>Loading...</p>
      ) : (
        <Table<UserRegistryData>
          data={userRegistry}
          tableActions={[
            { callback: onDeleteRegistryHandler, icon: <FaRegTrashAlt /> }
          ]}
        />
      )}
    </PageContainer>
  );
};
