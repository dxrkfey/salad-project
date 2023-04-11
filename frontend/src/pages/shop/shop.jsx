import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import { Navbar } from "../../components/navbar";
import { useEffect } from "react";

export const Shop = (props) => {
  const setSec = (id) => {
    props.setUserID(id);
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3333/authen", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.error('success:', data);
        if (data.status == "ok") {
          //alert('authen successfully')
          setSec(data.UserID);
        } else {
          alert("please login");
          localStorage.removeItem("token");
          window.location = "/";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  //console.log(props.UserID)

  return (
    
    <div className="shop">
      <Navbar/>
      <div className="shopTitle">
        <h1>Salad Shop</h1>
      </div>
      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};
