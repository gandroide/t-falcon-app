import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FooterBar } from '../../components/Footer';
import { app } from '../../config/firebase';
import { ModalContext } from '../../context/Modal';
import { SidepanelContext } from '../../context/Sidepanel';
import { Pesagem } from '../pesagem';
import {
  Container,
  MenuContainer,
  MenuItem,
  TopBar,
  TopBarInfo
} from './Home.styles';

const SidepanelChildren = () => {
  return <Pesagem />;
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
      <TopBar>
        <h2>Home</h2>
        <TopBarInfo>
          <h2>T-Falcon</h2>
          <h2>Username</h2>
        </TopBarInfo>
      </TopBar>
      <MenuContainer>
        <MenuItem>
          <Button onClick={onConfirmPicagemHandler}>Registrar Picagem</Button>
        </MenuItem>
        <MenuItem>
          <Button onClick={onBirdRegisterHandler}>Adicionar Pesagem</Button>
        </MenuItem>
        <MenuItem>
          <Link to="/pesagem">Registar Peso</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/relatorio">Relatorio de Serviço</Link>
        </MenuItem>
        {/* <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select> */}
        <MenuItem>
          <Link to="/">Back</Link>
        </MenuItem>
      </MenuContainer>
      <FooterBar></FooterBar>
    </Container>
  );
};
