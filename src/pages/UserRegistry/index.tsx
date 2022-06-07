import moment from 'moment';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { app } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { PageContainer } from './styled';

interface UserRegistryData {
  id: string;
  date: string;
  entrada: string;
  saida: string;
}

const secondsToDate = (seconds: number) => new Date(seconds * 1000);

const formattedDate = (date: Date) => moment(date).format('L');

const formattedTime = (date: Date) => moment(date).format('LT');

export const UserRegistry = () => {
  const { user } = useContext(AuthContext);
  const [userRegistry, setUserRegistry] = useState<UserRegistryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserRegistry = useCallback(() => {
    app
      .collection('user_registry')
      .where('userId', '==', user.userId)
      .get()
      .then((onSnapshot) => {
        if (onSnapshot.empty) return;

        const userRegistryData: UserRegistryData[] = [];

        onSnapshot.forEach((doc) => {
          const entry = secondsToDate(doc.data().entryDate.seconds);
          const leave = secondsToDate(doc.data().leaveDate.seconds);
          const date = formattedDate(entry);
          const entryTime = formattedTime(entry);
          const leaveTime = formattedTime(leave);
          userRegistryData.push({
            id: doc.id,
            date,
            entrada: entryTime,
            saida: leaveTime
          });
        });

        setUserRegistry(userRegistryData);
        setIsLoading(false);
      });
  }, [user.userId]);

  useEffect(() => {
    getUserRegistry();
  }, [getUserRegistry]);

  //   if (userRegistry.length) {
  //     const tableHeader = Object.keys(userRegistry[0]).map((data) => data);

  //     console.log(tableHeader);
  //   }

  return (
    <PageContainer>
      <h1>Picagens</h1>
      {isLoading ? <p>Loading...</p> : <div>Tabela</div>}
    </PageContainer>
  );
};
