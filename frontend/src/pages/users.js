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

function createData(email, name, lastName) {
  return { name, lastName, email };
}

function UsersPage() {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  const loadUsers = () => {
    setUsers([]);
    userService.getUsers().then(({ data }) => {
      const _users = data.message.users.reduce((prev, current) => {
        const _user = createData(current.email, current.name, current.lastName);
        prev = [...prev, _user];
        return prev;
      }, []);
      setUsers(_users);
    });
  };

  useEffect(loadUsers, []);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6"> 💵 Paidme - usuarios </Typography>
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
                <TableCell>Nombre</TableCell>
                <TableCell align="left">Apellido</TableCell>
                <TableCell align="left">Correo electrónico</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.email}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default UsersPage;
