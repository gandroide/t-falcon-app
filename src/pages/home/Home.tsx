import { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from '../../components/Button';
import { FooterBar } from '../../components/Footer';
import { app, appTimestamp } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { ModalContext } from '../../context/Modal';
import { SidepanelContext } from '../../context/Sidepanel';
import {
  Container,
  MenuContainer,
  MenuItem,
  TopBar,
  TopBarInfo
} from './Home.styles';
import { BirdWeightForm } from '../../containers/BirdWeightForm';
import { IBirdData } from '../../interfaces';

export const Home = () => {
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onSetModalHandler } = useContext(ModalContext);
  const { onLogoutHandler, user } = useContext(AuthContext);

  const onRegisterPicagemHandler = (id?: string) => {
    if (id) {
      app
        .collection('user_registry')
        .doc(id)
        .update({
          leaveDate: appTimestamp.fromDate(new Date())
        });
    } else {
      app.collection('user_registry').add({
        userId: user.userId,
        displayName: user.displayName,
        entryDate: appTimestamp.fromDate(new Date())
      });
    }
  };

  const onConfirmPicagemHandler = () => {
    const currentDate = moment().format('L');
    const nextDate = moment().add(1, 'days').format('L');

    app
      .collection('user_registry')
      .where('userId', '==', user.userId)
      .where('entryDate', '>', new Date(currentDate))
      .where('entryDate', '<=', new Date(nextDate))
      .limit(1)
      .get()
      .then((value) => {
        if (value.empty) {
          onSetModalHandler({
            isOpen: true,
            type: 'info',
            title: 'Registar Entrada',
            description:
              'Clique no botão confirmar para registar a sua entrada',
            onConfirmCallback: onRegisterPicagemHandler,
            onCloseCallback: null
          });
        } else {
          onSetModalHandler({
            isOpen: true,
            type: 'info',
            title: 'Registar Saída',
            description: 'Clique no botão confirmar para registar a sua saída',
            onConfirmCallback: () => onRegisterPicagemHandler(value.docs[0].id),
            onCloseCallback: null
          });
        }
      });
  };

  const onWeightRegisterHandler = () => {
    app
      .collection('birds')
      .get()
      .then((docs) => {
        if (docs.empty) return;

        const birdsData: IBirdData[] = [];

        docs.forEach((doc) => {
          birdsData.push({
            id: doc.id,
            identificação: doc.data()['identificação'],
            nome: doc.data().nome
          });
        });

        onOpenSidepanelHandler({
          isOpen: true,
          SidepanelChildren: <BirdWeightForm birdsData={birdsData} />
        });
      });
  };

  const LinkComponent = {
    display: 'inline-block',
    padding: '0.7em 1.7em',
    margin: '0 0.3em 0.3em 0',
    minWidth: '160px',
    borderStyle: 'hidden',
    borderRadius: '0.5em',
    textDecoration: 'none',
    fontWeight: '400',
    color: '#ffffff',
    backgroundColor: '#3369ff'
  };

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
          <Button onClick={onWeightRegisterHandler}>Registar Pesagem</Button>
        </MenuItem>
        <MenuItem>
          <Link style={LinkComponent} to="/relatorio">
            Relatorio de Serviço
          </Link>
        </MenuItem>
        <MenuItem>
          <Link style={LinkComponent} to="/map">
            Map
          </Link>
        </MenuItem>
        {/* <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select> */}
      </MenuContainer>
      <FooterBar></FooterBar>
    </Container>
  );
};
