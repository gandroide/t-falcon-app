import { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { app } from '../../config/firebase';
import { ModalContext } from '../../context/Modal';
import { SidepanelContext } from '../../context/Sidepanel';
import { IForm, IInput } from '../../interfaces';
import { Container } from './Home.styles';

const birdRegisterInputs: IInput[] = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    value: '',
    placeholder: 'Introduza nome da ave'
  },
  {
    name: 'identification',
    label: 'Anilha',
    type: 'text',
    value: '',
    placeholder: 'Introduza anilha da ave'
  }
];

const SidepanelChildren = () => {
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

  return (
    <Form
      fields={birdRegisterInputs}
      onSubmitCallback={onBirdRegisterHandler}
    />
  );
};

export const Home = ({ setSelectClient, selectValue }: any) => {
  const { onSetModalHandler } = useContext(ModalContext);
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);

  const onRegisterPicagemHandler = () => {
    // fazer pedido para registar picagem
    console.log('Registar Picagem');
  };

  const onConfirmPicagemHandler = () => {
    onSetModalHandler({
      isOpen: true,
      type: 'info',
      title: 'Registar Picagem',
      description: 'Clique no botão confirmar para registar a sua picagem',
      onConfirmCallback: onRegisterPicagemHandler,
      onCloseCallback: null
    });
  };

  const onBirdRegisterHandler = () => {
    onOpenSidepanelHandler({
      isOpen: true,
      SidepanelChildren: <SidepanelChildren />
    });
  };

  return (
    <Container>
      <h3>Home</h3>
      <Button onClick={onConfirmPicagemHandler}>Registrar Picagem</Button>
      <Button onClick={onBirdRegisterHandler}>Registrar Ave</Button>
      <Link to="/pesagem">Registar Peso</Link>
      <Link to="/relatorio">Relatorio de Serviço</Link>
      <Link to="/">Back</Link>
    </Container>
  );
};
