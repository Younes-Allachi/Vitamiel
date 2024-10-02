import React from 'react';
import CartPage from 'app/modules/cart/CartPage/CartPage';
import Scrollbar from 'app/modules/home/scrollbar';

const Cart: React.FC = () => {
  return (
    <>
      <div id="top"></div>
      <br />
      <CartPage />
      <Scrollbar />
    </>
  );
};

export default Cart;
