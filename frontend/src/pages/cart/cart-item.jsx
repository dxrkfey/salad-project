import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Product } from "../shop/product";




export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount ,getTotalCartAmount} =
   useContext(ShopContext);
   
   const totalAmount = getTotalCartAmount();
   let name = [];
   let Price = [];
   let amount = [];
   let menuID = [];
   var Data = [name,Price,amount,menuID];
   //console.log(props.orderid);
   
   function sendDataToBackend() {
   const promises = [];
   for (let i = 0; i < name.length; i++) {
    const menuname = name[i];
    const menuprice = Price[i]*amount[i];
    const menuamount = amount[i];
    const menuid = menuID[i];


    const payload = JSON.stringify({ 
    menu_name : menuname,
    price : menuprice,
    amount : menuamount,
    menuID : menuid,
    orderID : props.orderid });
    const promise = fetch('http://localhost:3333/order_detail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload,
    });
  promises.push(promise);
   }
   Promise.all(promises)
    .then(responses => {
      name.splice(0, name.length);
      Price.splice(0,Price.length);
      amount.splice(0, amount.length);
      menuID.splice(0, menuID.length);
      console.log(responses);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}


   name.push(productName);
   Price.push(price);
   amount.push(cartItems[id]);
   menuID.push(id);
   sendDataToBackend();
   


  return (
    <div className="cartItem">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ฿{price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
