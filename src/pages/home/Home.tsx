import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { ModalContext } from "../../context/Modal";
import { Container } from "./Home.styles";

export const Home = ({ setSelectClient, selectValue }: any) => {
  const { onSetModalHandler } = useContext(ModalContext);

  const onRegisterPicagemHandler = () => {
    // fazer pedido para registar picagem
    console.log("Registar Picagem");
  };

  const onConfirmPicagemHandler = () => {
    onSetModalHandler({
      isOpen: true,
      type: "info",
      title: "Registar Picagem",
      description: "Clique no botão confirmar para registar a sua picagem",
      onConfirmCallback: onRegisterPicagemHandler,
      onCloseCallback: null
    });
  };

  return (
    <Container>
      <h3>Home</h3>
      <Button onClick={onConfirmPicagemHandler}>Registrar Picagem</Button>
      <Link to="/pesagem">Registrar Ave</Link>
      <Link to="/relatorio">Relatorio de Serviço</Link>
      {/* <Select selected={selectValue} onChangeHandler={setSelectClient} options={clientes}></Select> */}
      <Link to="/">Back</Link>
    </Container>
  );
};
