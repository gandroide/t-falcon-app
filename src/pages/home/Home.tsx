import { useCallback, useContext } from 'react';
import moment from 'moment';
import { Button } from '../../components/Button';
import { FooterBar } from '../../components/Footer';
import { app, appTimestamp } from '../../config/firebase';
import { AuthContext } from '../../context/Auth';
import { ModalContext } from '../../context/Modal';
import { SidepanelContext } from '../../context/Sidepanel';
import { Container, MenuContainer, MenuItem, TopBar } from './Home.styles';
import { BirdWeightForm } from '../../containers/BirdWeightForm';
import {
  CarsData,
  ClientsData,
  IBirdData,
  IBirdWeight
} from '../../interfaces';
import { ServicesReport } from '../ServicesReport';
import { LoadingContext } from '../../context/Loading';
import { currentPosition } from '../../components/Map';
import { Table } from '../../components/Table';
import { toast } from 'react-toastify';
import { FaBalanceScale, FaUserEdit, FaWeight } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import { SidepanelTitle } from '../../components/SidePanel/style';

const secondsToDate = (seconds?: number) => {
  if (seconds) {
    return new Date(seconds * 1000);
  }
};

const formattedDate = (date?: Date) => {
  if (date) {
    return moment(date).format('DD-MM-YYYY');
  }
};

const SIDEPANEL_WIDTH = '600px';

export const Home = () => {
  const { onOpenSidepanelHandler } = useContext(SidepanelContext);
  const { onSetModalHandler } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const { onLoadingHandler } = useContext(LoadingContext);

  const onRegisterPicagemHandler = (coords: currentPosition, id?: string) => {
    onLoadingHandler(true);

    if (id) {
      app
        .collection('user_registry')
        .doc(id)
        .update({
          leaveDate: appTimestamp.fromDate(new Date()),
          latitude_out: coords.latitude,
          longitude_out: coords.longitude
        })
        .then(() => {
          app
            .collection('counters')
            .doc('user_registry')
            .get()
            .then((doc) => {
              let count = (doc?.data()?.count || 0) + 1;

              app
                .collection('counters')
                .doc('user_registry')
                .set({ count })
                .catch(() => {
                  toast.error('Ocorreu um erro ao registar a picagem');
                })
                .then(() => {
                  app
                    .collection('users')
                    .doc(user.userId!)
                    .get()
                    .then((doc) => {
                      let count = (doc?.data()?.user_registry_count || 0) + 1;

                      app
                        .collection('users')
                        .doc(user.userId!)
                        .update({ user_registry_count: count })
                        .then(() => {
                          onLoadingHandler(false);
                          toast.success('Saída registada com sucesso.');
                        });
                    });
                })
                .catch((e) => {
                  toast.error('Ocorreu um erro ao registar a picagem');
                });
            })
            .catch(() => {
              toast.error('Ocorreu um erro ao registar a picagem');
            });
        })
        .catch(() => {
          toast.error('Ocorreu um erro ao registar a picagem');
        });
    } else {
      app
        .collection('user_registry')
        .add({
          userId: user.userId,
          displayName: user.displayName,
          entryDate: appTimestamp.fromDate(new Date()),
          latitude_entry: coords.latitude,
          longitude_entry: coords.longitude
        })
        .then(() => {
          onLoadingHandler(false);
          toast.success('Entrada registada com sucesso.');
        });
    }
  };

  const onConfirmPicagemHandler = async () => {
    onLoadingHandler(true);
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

    app
      .collection('user_registry')
      .orderBy('entryDate', 'desc')
      .where('userId', '==', user.userId)
      .where('entryDate', '>', new Date(currentDate))
      .where('entryDate', '<=', new Date(nextDate))
      .limit(1)
      .get()
      .then((value) => {
        if (
          value.empty ||
          (!value.empty && 'leaveDate' in value.docs[0].data())
        ) {
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
      })
      .catch((e) => {
        onLoadingHandler(false);
        toast.error('Ocorreu um erro ao registar a picagem');
      })
      .finally(() => {
        onLoadingHandler(false);
      });
  };

  const onWeightRegisterHandler = () => {
    onLoadingHandler(true);
    app
      .collection('birds')
      .get()
      .then((docs) => {
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
          SidepanelChildren: <BirdWeightForm birdsData={birdsData} />,
          sidepanelWidth: SIDEPANEL_WIDTH
        });
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao registar a pesagem.');
      })
      .finally(() => {
        onLoadingHandler(false);
      });
  };

  const onSeeWeightHandler = () => {
    onLoadingHandler(true);
    app
      .collection('last_weighin')
      .get()
      .then((docs) => {
        const birdsData: IBirdWeight[] = [];

        docs.forEach((doc) => {
          birdsData.push({
            nome: doc.data().nome,
            peso: doc.data().peso.toString() + ' gr',
            data: formattedDate(secondsToDate(doc.data()?.data.seconds))!
          });
        });

        onOpenSidepanelHandler({
          isOpen: true,
          SidepanelChildren: (
            <>
              <SidepanelTitle>Últimas pesagens</SidepanelTitle>
              <Table
                count={0}
                onTableRenderCallback={() => {}}
                onSearchCallback={() => {}}
                filterOptions={[]}
                data={birdsData}
                tableActions={[]}
              />
            </>
          ),
          sidepanelWidth: SIDEPANEL_WIDTH
        });
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao mostrar a listagem de pesagens.');
      })
      .finally(() => {
        onLoadingHandler(false);
      });
  };

  const onServicesReportHanlder = useCallback(() => {
    onLoadingHandler(true);
    app
      .collection('birds')
      .get()
      .then((docs) => {
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
            const clientsData: ClientsData[] = [];

            docs.forEach((doc) => {
              clientsData.push({
                id: doc.id,
                nome: doc.data().name
              });
            });

            app
              .collection('cars')
              .get()
              .then((docs) => {
                const carsData: CarsData[] = [];

                docs.forEach((doc) => {
                  carsData.push({
                    id: doc.id,
                    matricula: doc.data().matricula,
                    viatura: doc.data().viatura
                  });
                });

                onOpenSidepanelHandler({
                  isOpen: true,
                  SidepanelChildren: (
                    <ServicesReport
                      clientsData={clientsData}
                      birdsData={birdsData}
                      carsData={carsData}
                    />
                  ),
                  sidepanelWidth: SIDEPANEL_WIDTH
                });
              })
              .catch(() => {
                toast.error('Ocorreu um erro. Tente novamente mais tarde.');
              })
              .finally(() => {
                onLoadingHandler(false);
              });
          })
          .catch(() => {
            toast.error('Ocorreu um erro. Tente novamente mais tarde.');
          });
      })
      .catch(() => {
        toast.error('Ocorreu um erro. Tente novamente mais tarde.');
      });
  }, [onLoadingHandler, onOpenSidepanelHandler]);

  return (
    <Container>
      <TopBar>
        <h1>Bem-vindo/a, {user.displayName}</h1>
      </TopBar>
      <MenuContainer>
        <MenuItem>
          <Button
            onClick={onConfirmPicagemHandler}
            icon={FaUserEdit}
            type="home"
          >
            Registrar Picagem
          </Button>
        </MenuItem>
        <MenuItem>
          <Button onClick={onWeightRegisterHandler} icon={FaWeight} type="home">
            Registar Pesagem
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={onSeeWeightHandler}
            type="home"
            icon={FaBalanceScale}
          >
            Pesagens
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={onServicesReportHanlder}
            type="home"
            icon={IoDocument}
          >
            Registar Relatorio
          </Button>
        </MenuItem>
      </MenuContainer>
      <FooterBar></FooterBar>
    </Container>
  );
};
