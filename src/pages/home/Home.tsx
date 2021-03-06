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
import { ClientsData, IBirdData } from '../../interfaces';
import { ServicesReport } from '../ServicesReport';
import { LoadingContext } from '../../context/Loading';
import { ServicesReportDetail } from '../ServicesReportDetails';

export const Home = () => {
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onSetModalHandler } = useContext(ModalContext);
  const { onLogoutHandler, user } = useContext(AuthContext);
  const { onLoadingHandler } = useContext(LoadingContext);

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
              'Clique no bot??o confirmar para registar a sua entrada',
            onConfirmCallback: onRegisterPicagemHandler,
            onCloseCallback: null
          });
        } else {
          onSetModalHandler({
            isOpen: true,
            type: 'info',
            title: 'Registar Sa??da',
            description: 'Clique no bot??o confirmar para registar a sua sa??da',
            onConfirmCallback: () => onRegisterPicagemHandler(value.docs[0].id),
            onCloseCallback: null
          });
        }
      });
  };

  const onWeightRegisterHandler = () => {
    onLoadingHandler(true);
    app
      .collection('birds')
      .get()
      .then((docs) => {
        // mensagem de erro
        if (docs.empty) return;

        const birdsData: IBirdData[] = [];

        docs.forEach((doc) => {
          birdsData.push({
            id: doc.id,
            identifica????o: doc.data()['identifica????o'],
            nome: doc.data().nome
          });
        });

        onLoadingHandler(false);
        onOpenSidepanelHandler({
          isOpen: true,
          SidepanelChildren: <BirdWeightForm birdsData={birdsData} />,
          width: 'small'
        });
      });
  };

  const onServicesReportHanlder = () => {
    onLoadingHandler(true);
    app
      .collection('birds')
      .get()
      .then((docs) => {
        // mensagem de erro
        if (docs.empty) return;
        const birdsData: IBirdData[] = [];

        docs.forEach((doc) => {
          birdsData.push({
            id: doc.id,
            identifica????o: doc.data()['identifica????o'],
            nome: doc.data().nome
          });
        });

        app
          .collection('clients')
          .get()
          .then((docs) => {
            // mensagem de erro
            if (docs.empty) return;

            const clientsData: ClientsData[] = [];

            docs.forEach((doc) => {
              clientsData.push({
                id: doc.id,
                nome: doc.data().name
              });
            });

            onLoadingHandler(false);
            onOpenSidepanelHandler({
              isOpen: true,
              SidepanelChildren: (
                <ServicesReport
                  clientsData={clientsData}
                  birdsData={birdsData}
                />
              ),
              width: 'small'
            });
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
  // return (
  //   <>
  //     <ServicesReportDetail />
  //   </>
  // );
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
          <Button onClick={onServicesReportHanlder}>Registar Relatorio</Button>
          {/* <Button onClick={onServicesReportHanlder}>
            Relatorio de Servi??o
          </Button> */}
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
