import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress, Button, Input } from "@material-ui/core";
import ContainerLogin from "../components/ContainerLogin";
import Container from "../components/Container";
import LabelInput from "../components/LabelInput";
import { userService } from "../services";

function LoginPage() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [activeSubmit, setActiveSubmit] = useState(false);

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlerSignIn = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    if (activeSubmit) {
      setIsLoadingSubmit(true);
      try {
        const { data } = await userService.signin({
          email,
          password,
          name,
          lastName,
        });
        localStorage.setItem("openPayId", data.message.customer.id);
        localStorage.setItem("userId", data.message.user.id);
        history.push("/submit");
      } catch (e) {
        console.log(e);
        setErrorMessage("Ocurrió un error iniciando sesión");
      }
      setIsLoadingSubmit(false);
    }
  };

  const handlerSetEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    evalIsReadyToActiveSubmit();
  };

  const handlerSetPassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
    evalIsReadyToActiveSubmit();
  };

  const handlerSetName = (event) => {
    event.preventDefault();
    setName(event.target.value);
    evalIsReadyToActiveSubmit();
  };

  const handlerSetLastName = (event) => {
    event.preventDefault();
    setLastName(event.target.value);
    evalIsReadyToActiveSubmit();
  };

  const evalIsReadyToActiveSubmit = () => {
    if (validateEmail(email) && password.length > 5) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <>
      <Container>
        <ContainerLogin>
          <h2
            style={{
              color: "white",
              fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
            }}
          >
            Inicia sesión
          </h2>
          <LabelInput>Correo electrónico</LabelInput>
          <Input
            style={{ color: "white", width: "300px", paddingTop: "10px" }}
            onChange={handlerSetEmail}
            type="email"
            placeholder="leonardo@gmail.com"
          ></Input>

          <LabelInput>Contraseña</LabelInput>
          <Input
            style={{ color: "white", width: "300px" }}
            onChange={handlerSetPassword}
            type="password"
            placeholder="Contraseña"
          ></Input>

          <LabelInput>Nombre</LabelInput>
          <Input
            style={{ color: "white", width: "300px" }}
            onChange={handlerSetName}
            type="text"
            placeholder="Nombre"
          ></Input>

          <LabelInput>Apellido</LabelInput>
          <Input
            style={{ color: "white", width: "300px" }}
            onChange={handlerSetLastName}
            type="text"
            placeholder="Apellido"
          ></Input>
          {!isLoadingSubmit ? (
            <Button
              style={{ paddingTop: "50px" }}
              color="secondary"
              disabled={!activeSubmit}
              onClick={handlerSignIn}
            >
              Iniciar sesión
            </Button>
          ) : (
            <CircularProgress color="secondary" />
          )}
          {errorMessage ? <p>{errorMessage}</p> : <div></div>}
        </ContainerLogin>
      </Container>
    </>
  );
}

export default LoginPage;
