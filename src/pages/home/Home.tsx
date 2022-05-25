import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { app } from '../../config/firebase';
import { ModalContext } from '../../context/Modal';
import { SidepanelContext } from '../../context/Sidepanel';
import { Container } from './Home.styles';

const SidepanelChildren = () => {
  return (
    <div>
      <h3>Hello world</h3>
      <p>Sou o children do sidepanel</p>
    </div>
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

  useEffect(() => {
    app
      .collection('birds')
      .get()
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <Container>
      <h3>Home</h3>
      <Button onClick={onConfirmPicagemHandler}>Registrar Picagem</Button>
      <Button onClick={onBirdRegisterHandler}>Registrar Ave</Button>
      <Link to="/pesagem">Registar Peso</Link>
      <Link to="/relatorio">Relatorio de Serviço</Link>
      {/* <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select> */}
      <Link to="/">Back</Link>
    </Container>
  );
};
