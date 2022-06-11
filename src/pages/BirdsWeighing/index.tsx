import moment from 'moment';
import { useEffect, useState } from 'react';
import { SearchFilter } from '../../components/SearchFilter';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { BirdsWeightData } from '../../interfaces';

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

export const BirdsWeighing = () => {
  const [birdsWeightData, setBirdsWeightData] = useState<BirdsWeightData[]>([]);
  const [birdsWeightCounter, setBirdsWeightCounter] = useState(0);

  useEffect(() => {
    app
      .collection('birds_weight')
      .orderBy('data', 'desc')
      .onSnapshot(async (onSnapshot) => {
        if (onSnapshot.empty) return;

        const birdsWeightData: BirdsWeightData[] = [];

        onSnapshot.forEach((doc) => {
          birdsWeightData.push({
            id: doc.id,
            nome: doc.data()['nome'],
            identificação: doc.data()['identificação'],
            peso: `${doc.data()['peso']} kg`,
            data: formattedDate(secondsToDate(doc.data()['data'].seconds))!
          });
        });

        const counter = await app
          .collection('counters')
          .doc('birds_weight')
          .get();

        setBirdsWeightCounter(counter.data()?.count);
        setBirdsWeightData(birdsWeightData);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <SearchFilter options={[]} onSearchCallback={() => {}} />
      <Table data={birdsWeightData} tableActions={[]} />
    </div>
  );
};
