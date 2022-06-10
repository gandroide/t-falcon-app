import { FC, useContext, useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Form } from '../../components/Form';
import { SearchFilter } from '../../components/SearchFilter';
import { Table } from '../../components/Table';
import { app } from '../../config/firebase';
import { SidepanelContext } from '../../context/Sidepanel';
import { IBirdData, IInput, IForm } from '../../interfaces';

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
        await app.collection('birds').add(data);
        onCloseSidepanelHandler();
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
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const [birds, setBirds] = useState<IBirdData[]>([]);

  const onBirdRegisterHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <FormAddBird />
    });
  };

  const onBirdEditHandler = (rowData: IBirdData) => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <FormAddBird id={rowData.id} updateData={rowData} />
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

  useEffect(() => {
    app.collection('birds').onSnapshot((doc) => {
      const birds: IBirdData[] = [];

      doc.docs.forEach((doc) => {
        birds.push({
          id: doc.id,
          nome: doc.data().nome,
          identificação: doc.data()['identificação']
        });
      });

      setBirds(birds);
    });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1>Registos das aves</h1>
        <button onClick={onBirdRegisterHandler}>Adicionar Ave</button>
      </div>
      <SearchFilter options={[]} onSearchCallback={() => {}} />
      <Table
        data={birds}
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
    </div>
  );
};
