import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from '../../components/Button';
import { FooterBar } from '../../components/Footer';
import { Form } from '../../components/Form';
import { app, appTimestamp } from '../../config/firebase';
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

export const Home = ({ setSelectClient, selectValue }: any) => {
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
