
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginIcon from '@mui/icons-material/Login';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import Divider from '@mui/material/Divider';
import { Chip } from '@mui/material';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from "react";
import Axios from "axios";
import React from 'react';
import p7 from './p7.png';

const bg = {
  background: `url(${p7})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '1000px',
  backgroundPosition: 'center',
  
};

function OrderEM() {
  const [order, setOrder] = useState([]);
  const [orderalert, setorderalert] = useState([]);
  const [status, setStatus] = useState("");
  const [orderdetail, setorderdetail] = useState([]);


  const myStyle1 = {
    fontFamily: "Sans-Serif",
    padding : "10px",
    backgroundColor : "lightblue"
    
  };
 
  const myStyle2 = {
    fontFamily: "Sans-Serif",
    padding : "40px"
    
  };
  const myStyle3 = {
    fontFamily: "Sans-Serif",
    fontSize :"40px"
  };
  const myStyle4 = {
    backgroundColor : "#99dfff"
  };
  const myStyle5 = {
    fontFamily: "Sans-Serif",
    backgroundColor : "#ffee33"
  };

  Axios.get("http://localhost:3333/order").then((response) => {
      setOrder(response.data);
    });

  const updateStatus = (id) => {
      Axios.put("http://localhost:3333/update", { status: "เสร็จสิ้น" , orderID: id }).then(
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
    
    Axios.get("http://localhost:3333/orderdetail").then((response) => {
      setorderdetail(response.data);
    });
    
    Axios.get("http://localhost:3333/orderalert").then((response) => {
      setorderalert(response.data);
    });


    
  return (
    < >
    
      
   
      <Navbar style={myStyle4} sticky="top"expand="md" >
        <Container>
          <Navbar.Brand >
            <h3 style={myStyle3} >Order</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
           <Nav className="justify-content-right">

           {orderalert.map((val) => {
              return (
                <div >
                  <Badge badgeContent={val.AlertOrder} color="primary">
                    <Nav.Link href="AlertOrder" ><NotificationsIcon/></Nav.Link>
                  </Badge>
            
                  </div>
                  
                );
                
            })}
           
            <Nav.Link  href="History" ><HistoryIcon/></Nav.Link>
            <Nav.Link  href="/" ><LoginIcon/></Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
           {/* ดึงorder */}
        
            
              {orderdetail.map((val) => {
                    return (
                      <div style={myStyle2} >
                        <b><Chip style={myStyle5} label={val.orderID} ></Chip></b>
                        <text style={myStyle2} > Total Price : {val.TotalPrice } bath</text>
                        <br></br><br></br>
                        <text style={myStyle2} > {val.detail} </text>
                        <br></br><br></br>
                        <text style={{padding:"30px"}} >
                          <b><Chip color='success' label={val.status} ></Chip></b>
                          </text>
                
                   
                          <text style={myStyle1} fontSize={10} size={10} >
                              <CircularProgress size={10}/>  &nbsp;
                              กำลังเตรียม
                            </text> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                            {/* ปุ่มอัพเดท */}
                            <button className="btn btn-warning btn-sm " 
                            onClick={() => {updateStatus(val.orderID)}}>เสร็จสิ้น</button>
                            <Divider size="10px"></Divider>
                            </div>
                                );
                                
                    })}
                    

         
         <div  style={bg}></div>
    

            
              
              
            
        
    </>
    
    
  );
}

export default OrderEM;




                  
                    