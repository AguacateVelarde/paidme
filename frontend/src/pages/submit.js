import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";

import AddIcon from "@material-ui/icons/Add";

import FormCards from "../components/FormCards";

import { userService } from "../services";

const useStyles = makeStyles({
  paper: {
    paddingBottom: 50,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  safeArea: {
    marginTop: "80px",
  },
});

function createData(name, cardNumber, id) {
  return { name, cardNumber, id };
}

function SubmitPage() {
  const [openModal, setOpenModal] = useState(false);
  const [cards, setCards] = useState([]);
  const classes = useStyles();

  const handleClose = () => setOpenModal(false);
  const handleOpenModel = () => setOpenModal(true);
  const handlerSubmitCard = (card) => {
    userService.createCard(card).then((response) => {
      handleClose();
      loadCards();
    });
  };
  const loadCards = () => {
    setCards([]);
    userService.getCards().then(({ data }) => {
      data.message.forEach((card) => {
        const _card = createData(
          card["holder_name"],
          card["card_number"],
          card["id"]
        );
        setCards([...cards, _card]);
      });
    });
  };

  useEffect(loadCards, []);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6"> 💵 Paidme - tus tarjetas </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.safeArea}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Titular de la tarjeta</TableCell>
                <TableCell align="left">Número de tarjeta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.cardNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Fab
            onClick={handleOpenModel}
            color="secondary"
            aria-label="add"
            className={classes.fabButton}
          >
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <FormCards onSubmit={handlerSubmitCard}></FormCards>
      </Modal>
    </>
  );
}

export default SubmitPage;
