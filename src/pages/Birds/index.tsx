import { FC, useContext, useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { LoadingContext } from '../../context/Loading';
import { SidepanelContext } from '../../context/Sidepanel';
import { IBirdData, IInput, IForm, ITable } from '../../interfaces';
import {
  AdminHeaderContainer,
  AdminTitleContainer,
  BurgerIconButton
} from '../../styles';

interface IFormAddBird {
  id?: string;
  updateData?: IBirdData;
  callback: () => void;
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

const SIDEPANEL_WIDTH = '500px';

type AdminOutletContext = {
  toggleAdminNavbar: () => void;
};

const FormAddBird: FC<IFormAddBird> = ({ id, updateData, callback }) => {
  let formData = [...birdRegisterInputs];

  const { onLoadingHandler } = useContext(LoadingContext);
  const { onCloseSidepanelHandler } = useContext(SidepanelContext);

  const onBirdRegisterHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      onLoadingHandler(true);
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
                onCloseSidepanelHandler(SIDEPANEL_WIDTH);
                callback();
                toast.success('Ave criada com sucesso.');
              });
          })
          .catch(() => {
            toast.error('Ocorreu um erro ao criar a ave.');
          });
      } catch (e) {
        onLoadingHandler(false);
      }
    },
    [onCloseSidepanelHandler, onLoadingHandler, callback]
  );

  const onBirdEditHandler = useCallback<IForm['onSubmitCallback']>(
    async (data) => {
      onLoadingHandler(true);
      try {
        await app.collection('birds').doc(id).update(data);
        onCloseSidepanelHandler(SIDEPANEL_WIDTH);
        callback();
        toast.success('Ave editada com sucesso');
      } catch (e) {
        onLoadingHandler(false);
      }
    },
    [onCloseSidepanelHandler, id, onLoadingHandler, callback]
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

  let title = 'Adicionar ave';

  if (id && updateData) {
    title = 'Editar ave';
  }

  return (
    <Form
      title={title}
      fields={formData}
      onSubmitCallback={id ? onBirdEditHandler : onBirdRegisterHandler}
    />
  );
};

export const Birds = () => {
  const { toggleAdminNavbar } = useOutletContext<AdminOutletContext>();
  const { onLoadingHandler } = useContext(LoadingContext);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const [birds, setBirds] = useState<IBirdData[]>([]);
  const [birdsCounter, setBirdsCounter] = useState(0);

  const onBirdRegisterHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <FormAddBird callback={callback} />,
      sidepanelWidth: SIDEPANEL_WIDTH
    });
  };

  const onBirdEditHandler = (rowData: IBirdData) => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: (
        <FormAddBird id={rowData.id} updateData={rowData} callback={callback} />
      ),
      sidepanelWidth: SIDEPANEL_WIDTH
    });
  };

  const callback = () => {
    const birdrsData: IBirdData[] = [];

    app
      .collection('birds')
      .orderBy('nome')
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          birdrsData.push({
            id: doc.id,
            nome: doc.data().nome,
            identificação: doc.data()['identificação']
          });
        });
        app
          .collection('counters')
          .doc('birds')
          .get()
          .then((docs) => {
            setBirdsCounter(docs.data()?.count ?? 0);
            setBirds(birdrsData);
            onLoadingHandler(false);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde.');
          });
      })
      .catch(() => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro. Tente novamente mais tarde.');
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
            toast.success('Ave eliminada com sucesso.');
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro ao eliminar uma ave.');
          });
      })
      .catch(() => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro ao eliminar uma ave.');
      });
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
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              birds.push({
                id: doc.id,
                nome: doc.data().nome,
                identificação: doc.data()['identificação']
              });
            });

            onLoadingHandler(false);
            setBirds(birds);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde.');
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
                data.forEach((doc) => {
                  birds.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    identificação: doc.data()['identificação']
                  });
                });

                onLoadingHandler(false);
                setBirds(birds);
              })
              .catch(() => {
                onLoadingHandler(false);
                toast.error('Ocorreu um erro. Tente novamente mais tarde.');
              });
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde.');
          });
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
      .get()
      .then((doc) => {
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
          .get()
          .then((docs) => {
            onLoadingHandler(false);
            setBirdsCounter(docs.data()?.count);
            setBirds(birds);
          })
          .catch(() => {
            onLoadingHandler(false);
            toast.error('Ocorreu um erro. Tente novamente mais tarde.');
          });
      })
      .catch(() => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro. Tente novamente mais tarde.');
      });
  }, [onLoadingHandler]);

  return (
    <>
      <AdminHeaderContainer>
        <AdminTitleContainer>
          <BurgerIconButton onClick={toggleAdminNavbar}>
            <GiHamburgerMenu size={26} color="#157416" />
          </BurgerIconButton>
          <h1>Aves</h1>
        </AdminTitleContainer>
        <Button type="primary" onClick={onBirdRegisterHandler}>
          Adicionar
        </Button>
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
    </>
  );
};
