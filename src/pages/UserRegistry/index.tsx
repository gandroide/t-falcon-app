import moment from 'moment';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { UserRegistryData } from '../../interfaces';
import { MenuItem } from '../home/Home.styles';
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

const LinkComponent = {
  display: 'inline-block',
  padding: '0.7em 1.7em',
  margin: '0 0.3em 0.3em 0',
  minWidth: '60px',
  borderStyle: 'hidden',
  borderRadius: '0.5em',
  textDecoration: 'none',
  fontWeight: '400',
  color: '#ffffff',
  backgroundColor: '#3369ff'
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
    <>
      <MenuItem>
        <Link style={LinkComponent} to="/home">
          Go Back
        </Link>
      </MenuItem>
      <PageContainer>
        <h1>Registos de Picagem</h1>
        {isLoading || !userRegistry.length ? (
          <p>Loading...</p>
        ) : (
          <Table
            count={0}
            data={userRegistry}
            onTableRenderCallback={() => {}}
            onSearchCallback={() => {}}
            filterOptions={[]}
            tableActions={[
              { callback: onDeleteRegistryHandler, icon: <FaRegTrashAlt /> }
            ]}
          />
        )}
      </PageContainer>
    </>
  );
};
