import React , {useEffect} from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from './Deposits';
import { useState } from "react";
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import p7 from './p7.png';

const bg = {
  background: `url(${p7})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '1000px',
  backgroundPosition: 'center',
  
};

export default function Album() {
  
  const myStyle2 = {
    fontFamily: "sans-serif",
    fontSize :"17px"
  };
  const myStyle3 = {
    padding : "40px"
  };
  const myStyle = {
    fontFamily: "sans-serif",
  };
  const [datastatic, setstatic] = useState([]);
  Axios.get("http://localhost:3333/static").then((response) => {
    setstatic(response.data);
    });
   
    //logout//
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = '/orderem'
    }
    
  
  return (
    <>
     <div style={bg}>
       <Navbar bg="dark" variant="dark" sticky="top"expand="md" >
        <Container>
          <Navbar.Brand >
            <h2  style={myStyle}>Statistics</h2>
          </Navbar.Brand>
          <Navbar.Toggle />
        <Nav className="justify-content-right">
            {/* //logout// */}
            <Button variant="contained" onClick={handleLogout}><LogoutIcon/></Button>
          </Nav>
          
        </Container>
      </Navbar>
       

      <Container  style={myStyle3}  maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* ยอดเงิน*/}
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <TableContainer component={Paper}>
      
      {/* ตารางรวมเมนูที่ถูกสั่ง*/}
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={myStyle2} align='center'>Menu</TableCell>
            <TableCell style={myStyle2} align='center'>Total amount/Month</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
           
          {datastatic.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  align='center'>{row.menu_name}</TableCell>
              <TableCell align='center'>{row.amount}</TableCell>
            </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
                
              </Grid>
            </Grid>
            
          </Container>
          <div  style={myStyle3}  ></div>
      </div>
    </>
  );
}
