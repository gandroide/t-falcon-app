import { useCallback, useContext } from 'react';
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
import { currentPosition } from '../../components/Map';

export const Home = () => {
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onSetModalHandler } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const onRegisterPicagemHandler = (coords: currentPosition, id?: string) => {
    if (id) {
      app
        .collection('user_registry')
        .doc(id)
        .update({
          leaveDate: appTimestamp.fromDate(new Date()),
          latitude_out: coords.latitude,
          longitude_out: coords.longitude
        });
    } else {
      app.collection('user_registry').add({
        userId: user.userId,
        displayName: user.displayName,
        entryDate: appTimestamp.fromDate(new Date()),
        latitude_entry: coords.latitude,
        longitude_entry: coords.longitude
      });
    }
  };

  const onConfirmPicagemHandler = async () => {
    const currentDate = moment().format('L');
    const nextDate = moment().add(1, 'days').format('L');

    const getCoords = async () => {
      const pos: any = await new Promise((resolve, rejects) => {
        navigator.geolocation.getCurrentPosition(resolve);
      });
      return {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude
      };
    };
    const coords = await getCoords();
    // console.log(coords);
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
            onConfirmCallback: () => onRegisterPicagemHandler(coords, ''),
            onCloseCallback: null
          });
        } else {
          onSetModalHandler({
            isOpen: true,
            type: 'info',
            title: 'Registar Saída',
            description: 'Clique no botão confirmar para registar a sua saída',
            onConfirmCallback: () =>
              onRegisterPicagemHandler(coords, value.docs[0].id),
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
            identificação: doc.data()['identificação'],
            nome: doc.data().nome
          });
        });

        onLoadingHandler(false);
        onOpenSidepanelHandler({
          isOpen: true,
          SidepanelChildren: <BirdWeightForm birdsData={birdsData} />,
          sidepanelWidth: '700px'
        });
      });
  };

  const onServicesReportHanlder = useCallback(() => {
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
            identificação: doc.data()['identificação'],
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
              sidepanelWidth: '700px'
            });
          });
      });
  }, [onLoadingHandler, onOpenSidepanelHandler]);

  // return (
  //   <>
  //     <ServicesReportDetail />
  //   </>
  // );
  return (
    <Container>
      <TopBar>
        <h2>Home</h2>
        <TopBarInfo>{/* <h2>T-Falcon</h2> */}</TopBarInfo>
      </TopBar>
      <MenuContainer>
        <MenuItem>
          <Button onClick={onConfirmPicagemHandler}>Registrar Picagem</Button>
        </MenuItem>
        <MenuItem>
          <Button onClick={onWeightRegisterHandler}>Registar Pesagem</Button>
        </MenuItem>
        <MenuItem>
          <Button onClick={onServicesReportHanlder}>Registar Relatorio</Button>
          {/* <Button onClick={onServicesReportHanlder}>
            Relatorio de Serviço
          </Button> */}
        </MenuItem>

        {/* <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select> */}
      </MenuContainer>
      <FooterBar></FooterBar>
    </Container>
  );
};
