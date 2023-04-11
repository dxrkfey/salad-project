import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import Axios from "axios";
import Divider from '@mui/material/Divider';
import { Chip } from '@mui/material';

function AlertOrder() {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const myStyle5 = {
    fontFamily: "Sans-Serif",
    backgroundColor : "#ffee33"
  };
  const myStyle2 = {
    fontFamily: "Sans-Serif",
    padding : "40px"
  };
  const myStyle4 = {
    backgroundColor : "#ff99bb"
  };
  const myStyle3 = {
    fontFamily: "Sans-Serif",
    fontSize :"40px"
  };
  const myStyle = {
    padding : "10px",
    fontFamily: "Sans-Serif",
    backgroundColor : "primary"
  };
  Axios.get("http://localhost:3333/orderconfirmation").then((response) => {
      setOrder(response.data);
    });
  
    
  const updateStatus1 = (id) => {
    Axios.put("http://localhost:3333/update", { status: "ยืนยันคำสั่งซื้อ" , orderID: id }).then(
      (response) => {
        setOrder(
          order.map((val) => {
            return val.orderID == id
              ? {
                  orderID: val.orderID ,
                  amount: val.amount,
                  TotalPrice: val.TotalPrice,
                  status: status,
                  user_id: val.user_id,
                  
                }
              : val;
          })
        );
      }
    );
  };
  const updateStatus2 = (id) => {
    Axios.put("http://localhost:3333/update", { status: "ยกเลิกคำสั่งซื้อ" , orderID: id }).then(
      (response) => {
        setOrder(
          order.map((val) => {
            return val.orderID == id
              ? {
                  orderID: val.orderID ,
                  amount: val.amount,
                  TotalPrice: val.TotalPrice,
                  status: status,
                  user_id: val.user_id,
                  
                }
              : val;
          })
        );
      }
    );
  };

  
  return (
    <>
       <Navbar style={myStyle4} sticky="top"expand="md" >
        <Container>
          <Navbar.Brand >
            <h3  style={myStyle3} >AlertOrder</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
        
          <Nav className="justify-content-right">
            <Nav.Link href="OrderEM" > <HomeIcon/></Nav.Link>
            <Nav.Link href="/" ><LoginIcon/></Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
      <br/>
    
    <br/>

          {/* ดึงorder */}
          {/* <OrderDetails /> */}
          
          {order.map((val) => {
              return (
                <div style={myStyle2} >
                        <b><Chip style={myStyle5} label={val.orderID} ></Chip></b>
                        <text style={myStyle2} > Total Price : {val.TotalPrice } bath</text>
                        <br></br><br></br>
                        <text > {val.detail} </text>
                        <br></br><br></br>
                        <text style={{padding:"30px"}} >
                 <b><Chip style={myStyle} label={val.status}  ></Chip></b>
                 </text>
                 <b><button type="button" class="btn btn-success" 
                  onClick={() => {updateStatus1(val.orderID)}}>ยืนยัน</button></b>
                  
                  <b> <button type="button"  class="btn btn-danger"
                  onClick={() => {updateStatus2(val.orderID)}}>ยกเลิก</button></b>
                 

                  <Divider size="10px"></Divider>

                  </div>
                  
                );
                
            })}
    </>
    
  );
}

export default AlertOrder;