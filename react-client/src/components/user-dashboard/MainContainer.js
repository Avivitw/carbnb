import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  TableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 1400
  },
  TableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  name: {
    fontWeight: 'bold',
    color: '#ec407a'
  },
  status: {
    fontweight: 'bold',
    fontsize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  },
  TableFooter: {
    justifyContent: 'right'
  },
    Mail: {
    color: '#1e88e5',
    fontSize: 30
  },
  Delete: {
    color: '#c62828',
    fontSize: 30,
  },
  AvatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

const tempUser = 3;

export default function MainContainer() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(0);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/user/${tempUser}`);
        if (response.status === 200) {
          setOrders(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getOrders();
  }, []);

  const deleteOrders = async (id) => {
    try {
      const response = await axios.delete(`/api/orders/${id}`);
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let today = new Date().toLocaleDateString("en-ca");
  today = new Date(today);
  console.log(today);
  return (
    <TableContainer component={Paper} className={classes.TableContainer}>
      <Table className={classes.table} aria-label="user-dashboard">
        <TableHead>
          <TableRow>
            <TableCell className={classes.TableHeaderCell} align="center">BOOKING ID</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} >VEHICLE INFO</TableCell>
            <TableCell className={classes.TableHeaderCell} >PICKUP DATE</TableCell>
            <TableCell className={classes.TableHeaderCell} >RETURN DATE</TableCell>
            <TableCell className={classes.TableHeaderCell} >PRICE</TableCell>
            <TableCell className={classes.TableHeaderCell} >HOST DETAILS</TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
            <TableCell className={classes.TableHeaderCell} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          new Date(new Date(row.end_date).toLocaleDateString("en-ca")) > today && (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell>
                <Avatar alt={row.image} img src={row.image} className={classes.AvatarLarge} />
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                  <Typography color="primary" variant="subtitle2">{row.make} {row.model}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="body2">{new Date(row.start_date).toLocaleDateString("en-ca")}</Typography>
              </TableCell>
              <TableCell>
              <Typography color="textSecondary" variant="body2">{new Date(row.end_date).toLocaleDateString("en-ca")}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">{row.price}</Typography>
              </TableCell>
              <TableCell>
                <Grid Container>
                  <Grid item>
                    <Typography className={classes.name}>{row.owners_name}</Typography>
                    <Typography color="textSecondary" variant="body2">{row.street_number} {row.street},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.city},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.province},</Typography>
                    <Typography color="textSecondary" variant="body2">{row.postal_code}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
                <TableCell>
                  <a href="mailto:{row.email}"><MailOutlineIcon className={classes.Mail}/></a>
                </TableCell>
                <TableCell>
                  <DeleteForeverIcon className={classes.Delete} onClick={() => deleteOrders(row.id)} style={{cursor: 'pointer'}}/>
                </TableCell>
              </TableRow>
            )
            ))}
          </TableBody>
        </Table>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableFooter>
    </TableContainer>
  );
};
