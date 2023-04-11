import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import "./cart.css";
import { Product } from "../shop/product";



export const Cart = (props) => {
  const { cartItems, getTotalCartAmount, checkout,sendDataToBackend } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  let orderid;

  const secOnce = (id) => {
    props.setorderid(id);
  }

  const setStat = (id) => {
    props.setStatus(id);
  }
  


  function fetchOrder() {
    const data = {
      amount : totalAmount[1],
      TotalPrice : totalAmount[0],
      status	: "รอยืนยันคำสั่งซื้อ",
      user_id : props.UserID
    };

  fetch('http://localhost:3333/orderinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        secOnce(data.ORDERID);
        let test = props.orderid;
        //console.log(test);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="cart">
      <Navbar/>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      {totalAmount[0] > 0 ? (
        <div className="checkout">
          <p> Subtotal: ฿{totalAmount[0]} </p>
          <button onClick={() => navigate("/shop")}> Continue Shopping </button>
          <button id="check" onClick={() => {
              fetchOrder();
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};

