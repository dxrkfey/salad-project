import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import Axios from "axios";


function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
const currentDate = new Date();
const month = currentDate.toLocaleString('default', { month: 'long' });
const year = currentDate.getFullYear();
const formattedDate = `${month} ${year}`; // ผลลัพธ์เช่น '11 เมษายน 2566'

    const myStyle2 = {
        fontFamily: "Sans-Serif",
        padding : "40px"
      };
      const myStyle1 = {
        fontFamily: "Sans-Serif",
        color : "#2979ff"
        
      };
    const [recentdeposits, setrecentdeposits] = useState([]);
    Axios.get("http://localhost:3333/recentdeposits").then((response) => {
        setrecentdeposits(response.data);
        });
  return (
    <>
    
    <React.Fragment>
     <h3 style={myStyle1} >Recent Deposits</h3> 
      {recentdeposits.map((val) => {
                    return (
                      <div style={myStyle2} >
                        <Typography component="p" variant="h4">{val.amount } </Typography>
                            </div>
                        );
                                
       })}
      
      <Typography color="text.secondary" sx={{ flex: 1 }} >
      {formattedDate}
      </Typography>
    </React.Fragment>
    </>
  );
}