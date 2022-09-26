import { useContext, useState } from 'react';
import { app } from '../config/firebase';
import { LoadingContext } from '../context/Loading';

interface ICollection {
  collection: string;
  orderClause: {
    value: string;
    direction: 'asc' | 'desc';
  };
  whereClause?: {
    key: string;
    operator: firebase.default.firestore.WhereFilterOp;
    value: string;
  };
  limit: number;
  pagination: {
    doc: string;
  };
}

export const useFirebase = <T,>({ dataResolver }: any) => {
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const { onLoadingHandler } = useContext(LoadingContext);

  const getInitialData = ({
    collection,
    orderClause,
    whereClause,
    limit,
    pagination
  }: ICollection) => {
    onLoadingHandler(true);
    let query: firebase.default.firestore.Query = app.collection(collection);

    if (orderClause) {
      query = query.orderBy(orderClause.value, orderClause.direction);
    }

    if (whereClause) {
      query = query.where(
        whereClause.key,
        whereClause.operator,
        whereClause.value
      );
    }

    query
      .limit(limit)
      .get()
      .then((response) => {
        const genericData: T[] = [];

        response.forEach((doc) => {
          genericData.push(dataResolver(doc));
        });

        app
          .collection('counters')
          .doc(pagination.doc)
          .get()
          .then((response) => {
            setCount(response.data()?.count);
            setData(genericData);
            onLoadingHandler(false);
          });
      });
  };

  return {
    data,
    count,
    getInitialData
  };
};
