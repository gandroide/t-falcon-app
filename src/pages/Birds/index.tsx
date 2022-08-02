import { FC, useContext, useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Form } from '../../components/Form';
import { SearchFilter } from '../../components/SearchFilter';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import { IBirdData, IInput, IForm, ITable } from '../../interfaces';
import { AdminContainer, AdminHeaderContainer } from '../../styles';

interface IFormAddBird {
  id?: string;
  updateData?: IBirdData;
}

let birdRegisterInputs: IInput[] = [
  {
    name: 'nome',
    label: 'Nome',
    type: 'text',
    value: '',
    placeholder: 'Introduza nome da ave'
  },
  {
    name: 'identificação',
    label: 'Anilha',
    type: 'text',
    value: '',
    placeholder: 'Introduza anilha da ave'
  }
];

const FormAddBird: FC<IFormAddBird> = ({ id, updateData }) => {
  let formData = [...birdRegisterInputs];

  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

  const onBirdRegisterHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      try {
        app
          .collection('birds')
          .add(data)
          .then(() => {
            app
              .collection('counters')
              .doc('birds')
              .get()
              .then(async (doc) => {
                let count = (doc?.data()?.count || 0) + 1;

                await app.collection('counters').doc('birds').set({ count });
                onCloseSidepanelHandler();
              });
          });
      } catch (e) {
        console.log(e);
      }
    },
    [onCloseSidepanelHandler]
  );

  const onBirdEditHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      try {
        await app.collection('birds').doc(id).update(data);
        onCloseSidepanelHandler();
      } catch (e) {
        console.log(e);
      }
    },
    [onCloseSidepanelHandler, id]
  );

  if (id && updateData) {
    formData = formData.map((field) => {
      return {
        ...field,
        value: updateData[field.name as keyof IFormAddBird['updateData']]
      };
    });
  } else {
    formData = formData.map((field) => {
      return {
        ...field,
        value: ''
      };
    });
  }

  return (
    <Form
      fields={formData}
      onSubmitCallback={id ? onBirdEditHandler : onBirdRegisterHandler}
    />
  );
};

export const Birds = () => {
  const { onLoadingHandler } = useContext(LoadingContext);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const [birds, setBirds] = useState<IBirdData[]>([]);
  const [birdsCounter, setBirdsCounter] = useState(0);

  const onBirdRegisterHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <FormAddBird />,
      width: 'large'
    });
  };

  const onBirdEditHandler = (rowData: IBirdData) => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <FormAddBird id={rowData.id} updateData={rowData} />,
      width: 'large'
    });
  };

  const onBirdDeleteHandler = (rowData: IBirdData) => {
    app
      .collection('birds')
      .doc(rowData.id)
      .delete()
      .then(() => {
        const stateCopy = [...birds];
        const itemIndex = stateCopy.findIndex((bird) => bird.id === rowData.id);
        stateCopy.splice(itemIndex, 1);
        console.log(stateCopy);
        setBirds(stateCopy);
      })
      .catch((e) => console.log('Error removind bird'));
  };

  const onPageChangeHandler = useCallback<
    ITable<IBirdData>['onTableRenderCallback']
  >(
    ({ page, filter, filterValue }) => {
      onLoadingHandler(true);
      const birds: IBirdData[] = [];

      if (page === 1) {
        app
          .collection('birds')
          .orderBy('nome')
          .limit(10)
          .onSnapshot((onSnapshot) => {
            if (onSnapshot.empty) return;

            onSnapshot.forEach((doc) => {
              birds.push({
                id: doc.id,
                nome: doc.data().nome,
                identificação: doc.data()['identificação']
              });
            });

            setBirds(birds);
            onLoadingHandler(false);
          });
      } else {
        const currentLimit = (page - 1) * 10;

        app
          .collection('birds')
          .orderBy('nome')
          .limit(currentLimit)
          .get()
          .then((documentSnapshots) => {
            const lastVisible =
              documentSnapshots.docs[documentSnapshots.docs.length - 1];

            app
              .collection('birds')
              .orderBy('nome')
              .startAfter(lastVisible)
              .limit(10)
              .get()
              .then((data) => {
                if (data.empty) return;

                data.forEach((doc) => {
                  birds.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    identificação: doc.data()['identificação']
                  });
                });

                setBirds(birds);
                onLoadingHandler(false);
              });
          })
          .catch((e) => {});
      }
    },
    [onLoadingHandler]
  );

  useEffect(() => {
    onLoadingHandler(true);
    app
      .collection('birds')
      .orderBy('nome')
      .limit(10)
      .onSnapshot((doc) => {
        const birds: IBirdData[] = [];

        doc.docs.forEach((doc) => {
          birds.push({
            id: doc.id,
            nome: doc.data().nome,
            identificação: doc.data()['identificação']
          });
        });

        app
          .collection('counters')
          .doc('birds')
          .onSnapshot((onSnapshot) => {
            if (!onSnapshot.exists) return;

            setBirdsCounter(onSnapshot.data()?.count);
            setBirds(birds);
            onLoadingHandler(false);
          });
      });
  }, [onLoadingHandler]);

  return (
    <AdminContainer>
      <AdminHeaderContainer>
        <h1>Registo das aves</h1>
        <button onClick={onBirdRegisterHandler}>Adicionar ave</button>
      </AdminHeaderContainer>
      <Table
        count={birdsCounter}
        data={birds}
        onTableRenderCallback={onPageChangeHandler}
        filterOptions={[]}
        onSearchCallback={onPageChangeHandler}
        tableActions={[
          {
            icon: <FaEdit />,
            callback: onBirdEditHandler
          },
          {
            icon: <FaTrash />,
            callback: onBirdDeleteHandler
          }
        ]}
      />
    </AdminContainer>
  );
};
