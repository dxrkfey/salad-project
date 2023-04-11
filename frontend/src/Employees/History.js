import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import Axios from "axios";
import Divider from '@mui/material/Divider';
import { Chip } from '@mui/material';

function History() {
  const myStyle5 = {
    fontFamily: "Sans-Serif",
    backgroundColor : "#ffee33"
  };
  const [orderfinish, setorderfinish] = useState([]);
  const myStyle2 = {
    fontFamily: "Sans-Serif",
    padding : "40px"
  };
  const myStyle3 = {
    fontFamily: "Sans-Serif",
    fontSize :"40px"
  };
  Axios.get("http://localhost:3333/orderfinish").then((response) => {
    setorderfinish(response.data);
    });

  return (
    <>
       <Navbar bg="dark" variant="dark" sticky="top"expand="md" >
        <Container>
          <Navbar.Brand >
            <h3 style={myStyle3}  >History</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
       <Nav className="justify-content-right">
          <Nav.Link href="OrderEM" > <HomeIcon/></Nav.Link>
          <Nav.Link href="/" ><LoginIcon/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br/>
      <div align="center" >
        <h5 >Order History</h5>
      </div>
      <div className="d-grid gap-2">
    </div>
    {orderfinish.map((val) => {
              return (
                  <div style={myStyle2} >
                        <b><Chip style={myStyle5} label={val.orderID} ></Chip></b>
                        <text style={myStyle2} > Total Price : {val.TotalPrice } bath</text>
                        <br></br><br></br>
                        <text style={myStyle2} > {val.detail} </text>
                        <br></br><br></br>
                  <b><Chip color='primary' label={val.status}  ></Chip></b>
                  
                  <br></br><br></br>
                  <Divider size="10px"></Divider>


                  </div>
                  
                );
                
            })}

    </>
    
  );
}

export default History;
;