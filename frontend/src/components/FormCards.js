import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Input, Button } from "@material-ui/core";
import LabelInput from "../components/LabelInput";
import { useState } from "react";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FormCards({ onSubmit }) {
  const classes = useStyles();
  const [card, setCard] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv2, setCvv2] = useState("");

  const handlerSubmit = () => {
    onSubmit({
      expirationMonth,
      expirationYear,
      card,
      cvv2,
    });
  };

  const handlerCardChange = (event) => {
    event.preventDefault();
    setCard(event.target.value);
  };

  const handlerCardCvv = (event) => {
    event.preventDefault();
    setCvv2(event.target.value);
  };

  const handlerCardMonth = (event) => {
    event.preventDefault();
    setExpirationMonth(event.target.value);
  };

  const handlerCardYear = (event) => {
    event.preventDefault();
    setExpirationYear(event.target.value);
  };

  return (
    <div style={getModalStyle()} className={classes.paper}>
      <Typography variant="h6"> Agrega una nueva tarjeta </Typography>
      <LabelInput>Correo electrónico</LabelInput>
      <Input
        style={{ color: "black", width: "300px", paddingTop: "10px" }}
        type="text"
        placeholder="1111-2222-3333-444"
        onChange={handlerCardChange}
      ></Input>

      <Input
        style={{ color: "black", width: "300px", paddingTop: "10px" }}
        type="text"
        placeholder="234"
        onChange={handlerCardCvv}
      ></Input>

      <Input
        style={{ color: "black", width: "300px", paddingTop: "10px" }}
        type="text"
        placeholder="02"
        onChange={handlerCardMonth}
      ></Input>

      <Input
        style={{ color: "black", width: "300px", paddingTop: "10px" }}
        type="text"
        placeholder="25"
        onChange={handlerCardYear}
      ></Input>

      <Button color="primary" onClick={handlerSubmit}>
        Crear nueva tarjeta
      </Button>
    </div>
  );
}
