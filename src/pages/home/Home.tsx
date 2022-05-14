import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
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

  return (
    <Container>
      <h3>Home</h3>
      <Button onClick={onConfirmPicagemHandler}>Registrar Picagem</Button>
      <button onClick={onBirdRegisterHandler}>Registrar Ave</button>
      <Link to="/pesagem">Registar Peso</Link>
      <Link to="/relatorio">Relatorio de Serviço</Link>
      {/* <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select> */}
      <Link to="/">Back</Link>
    </Container>
  );
};
