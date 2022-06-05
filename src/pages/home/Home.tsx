import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FooterBar } from '../../components/Footer';
import { Form } from '../../components/Form';
import { app } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { ModalContext } from '../../context/Modal';
import { SidepanelContext } from '../../context/Sidepanel';
import { IBirdData, IForm, IInput } from '../../interfaces';
import {
  Container,
  MenuContainer,
  MenuItem,
  TopBar,
  TopBarInfo
} from './Home.styles';

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
  const { onLogoutHandler, user } = useContext(AuthContext);
  const [birds, setBirds] = useState<IBirdData[]>([]);

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
    app.collection('birds').onSnapshot((doc) => {
      const birds: IBirdData[] = [];

      doc.docs.forEach((doc) => {
        birds.push({
          id: doc.id,
          name: doc.data().name,
          identification: doc.data().identification
        });
      });

      setBirds(birds);
    });
  }, []);

  return (
    <Container>
      <TopBar>
        <h2>Home</h2>
        <TopBarInfo>
          <h2>T-Falcon</h2>
          <h2>{user.displayName}</h2>
        </TopBarInfo>
      </TopBar>
      <MenuContainer>
        <MenuItem>
          <Button onClick={onLogoutHandler}>Logout</Button>
        </MenuItem>
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
        {birds.map(({ id, name, identification }) => (
          <div>
            {id} - {name} - {identification}
          </div>
        ))}
      </MenuContainer>
      <FooterBar></FooterBar>
    </Container>
  );
};
