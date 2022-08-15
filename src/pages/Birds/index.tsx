import { FC, useContext, useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Form } from '../../components/Form';
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

  const { onLoadingHandler } = useContext(LoadingContext);
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
      onLoadingHandler(true);
      try {
        await app.collection('birds').doc(id).update(data);
        onLoadingHandler(false);
        onCloseSidepanelHandler();
      } catch (e) {
        console.log(e);
      }
    },
    [onCloseSidepanelHandler, id, onLoadingHandler]
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
      sidepanelWidth: '500px'
    });
  };

  const onBirdEditHandler = (rowData: IBirdData) => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <FormAddBird id={rowData.id} updateData={rowData} />,
      sidepanelWidth: '500px'
    });
  };

  const onBirdDeleteHandler = (rowData: IBirdData) => {
    onLoadingHandler(true);
    app
      .collection('birds')
      .doc(rowData.id)
      .delete()
      .then(() => {
        const stateCopy = [...birds];
        const itemIndex = stateCopy.findIndex((bird) => bird.id === rowData.id);
        stateCopy.splice(itemIndex, 1);

        app
          .collection('counters')
          .doc('birds')
          .get()
          .then(async (doc) => {
            let count = doc?.data()?.count - 1;

            await app.collection('counters').doc('birds').set({ count });
            setBirds(stateCopy);
            setBirdsCounter(count);
            onLoadingHandler(false);
          });
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
        onLoadingHandler(false);
        if (doc.empty) return;

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
            onLoadingHandler(false);
            if (!onSnapshot.exists) return;

            setBirdsCounter(onSnapshot.data()?.count);
            setBirds(birds);
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
