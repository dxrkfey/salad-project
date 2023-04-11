import React from "react";
import { Navbar } from "../components/navbar";
import { useState, useEffect } from 'react';
import axios from "axios";
import Divider from '@mui/material/Divider';
import { Chip } from '@mui/material';

export const HistoryCus = (props) => {


    const [orderhis, setorderhis] = useState([]);
    var userID = props.UserId;

    const myStyle2 = {
      fontFamily: "Sans-Serif",
      padding : "20px"
    };
    const myStyle3 = {
      fontFamily: "Sans-Serif",
      fontSize :"20px"
    };

  fetch('http://localhost:3333/history')
  .then(response => response.json())
  .then(data => {
    setorderhis(data);
  })
  .catch(error => {
    console.error(error);
  });

  //console.log(orderhis);

  

  return (
    <>
    <div className="history">
      <Navbar/>
      <h1>HISTORY</h1>
      <div>
      {orderhis.map((val) => {
              return (
                <div style={myStyle3} >
                <br></br>
                <text style={myStyle2} >OrderID  {val.orderID} </text>
                <text style={myStyle2} >{val.Date}</text>
                <text style={myStyle2} >amount  {val.amount }</text>
                <text style={myStyle2} >TotalPrice  {val.TotalPrice} bath</text>
                <b><Chip color='primary' label={val.status}  ></Chip></b>
                <br></br><br></br>
                <Divider size="10px"></Divider>
                </div>
                );
            })}

      </div>
    </div>
    </>
  );
};
