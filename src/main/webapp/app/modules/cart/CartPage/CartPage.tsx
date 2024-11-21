import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Button } from '@mui/material';
import { totalPrice } from 'app/shared/util/lists';
import { removeFromCart, incrementQuantity, decrementQuantity } from 'app/shared/actions/action';
import { Translate } from 'react-jhipster';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import './CartPage.scss';

interface CartPageProps {
  carts: CartItem[];
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  qty: number;
  price: number;
}

const CartPage: React.FC<CartPageProps> = (props) => {
  const { carts, incrementQuantity, decrementQuantity } = props;

  const currentLocale = useSelector((state: any) => state.locale.currentLocale);
  const [locale, setLocale] = useState(currentLocale);
  const currencySymbol = locale === 'fr' ? '€' : '$'; 

  const subTotal = totalPrice(carts);
  const vat = subTotal * 0.06;
  const total = subTotal + vat > 0 ? subTotal + vat : 1;  // Ensure total is never zero

  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const newQty = parseInt(e.target.value, 10);
    if (newQty > 0) {
      const item = carts.find(cartItem => cartItem.id === itemId);
      if (item && item.qty !== newQty) {
        const difference = newQty - item.qty;
        if (difference > 0) {
          Array.from({ length: difference }).forEach(() => incrementQuantity(itemId));
        } else {
          Array.from({ length: -difference }).forEach(() => decrementQuantity(itemId));
        }
      }
    }
  };

  const createOrder = async (data, actions) => {
    try {
      // Step 1: Create the order on your backend and get the response
      const response = await axios.post('/api/paypal/create-order', {
        total: total.toFixed(2),
        currency: locale === 'fr' ? 'EUR' : 'USD',
      });
  
      console.log('Complete response from backend:',response.data);
      
      // Step 2: Extract the paymentId, orderId (EC token), and approvalUrl from the response
      const { paymentId,orderId, approvalUrl  } = response.data;
  
      if (!paymentId || !orderId || !approvalUrl) {
        throw new Error("PayPal Payment ID, Approval URL, or Order ID is missing.");
      }
  
      // Log the response data to confirm correct extraction
      console.log('Payment ID:', paymentId);  // "PAYID-M4335EQ0NV62288P56558311"
      console.log('Approval URL:', approvalUrl);  // URL to redirect user
      console.log('Order ID:', orderId);  // EC Token: "EC-490333546W7726802"
  
      // Step 3: Return the approval URL (this is what PayPal needs for redirection)
      return orderId;  // This should return the order ID (EC token), not void
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw new Error('Failed to create PayPal order');
    }
  };
  
  
  const onApprove = async (data, actions) => {
    try {
      // Capture the payment after the user approves it on PayPal
      const order = await actions.order.capture(); // This is where the payment is captured
      const orderId = order.id;  // PayPal Order ID after approval, for example: "EC-490333546W7726802"
      const payerId = data.payerID;  // PayPal Payer ID, for example: "UZ8CDAK92W2RC"
  
      console.log('PayPal Order ID:', orderId); // "EC-490333546W7726802"
      console.log('PayPal Payer ID:', payerId); // "UZ8CDAK92W2RC"
  
      // Send paymentId and payerId to your backend to capture the payment
      await axios.post('/api/paypal/capture-payment', {
        paymentId: orderId,  // Use the PayPal Order ID
        payerId: payerId,    // Use the PayPal Payer ID
      });
  
      setLoading(false);
      console.log('Payment captured successfully');
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      setLoading(false);
    }
  };
  
  
  

  const ButtonWrapper = ({ showSpinner }: { showSpinner: boolean }) => {
    const [{ isPending }] = usePayPalScriptReducer();
  
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => console.error("PayPal Error: ", err)}
        />
      </>
    );
  };
  

  const handleProceedToCheckout = () => {
    setLoading(true);  
  };

  return (
    <>
      <div className="cart-area section-padding">
        <div className="container">
          <div className="form">
            <div className="cart-wrapper">
              <div className="row">
                <div className="col-12">
                  <form action="cart">
                    <table className="table-responsive cart-wrap">
                      <thead>
                        <tr>
                          <th className="images images-b">
                            <Translate contentKey="cart2.image">Image</Translate>
                          </th>
                          <th className="product-2">
                            <Translate contentKey="cart2.productName">Product Name</Translate>
                          </th>
                          <th className="pr">
                            <Translate contentKey="cart2.quantity">Quantity</Translate>
                          </th>
                          <th className="ptice">
                            <Translate contentKey="cart2.price">Price</Translate>
                          </th>
                          <th className="stock">
                            <Translate contentKey="cart2.totalPrice">Total Price</Translate>
                          </th>
                          <th className="remove remove-b">
                            <Translate contentKey="cart2.action">Action</Translate>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts.map((catItem, crt) => (
                          <tr key={crt}>
                            <td className="images">
                              <img src={`http://localhost:8080/${catItem.imageUrl}`} className="img2" alt="" />
                            </td>
                            <td className="product">
                              <p>{catItem.name}</p>
                            </td>
                            <td className="stock">
                              <div className="quantity cart-plus-minus">
                                <Button className="dec qtybutton" onClick={() => decrementQuantity(catItem.id)}>
                                  -
                                </Button>
                                <input
                                  type="number"
                                  value={catItem.qty}
                                  min="1"
                                  onChange={e => handleQuantityChange(e, catItem.id)}
                                  className="quantity-input"
                                />
                                <Button className="inc qtybutton" onClick={() => incrementQuantity(catItem.id)}>
                                  +
                                </Button>
                              </div>
                            </td>
                            <td className="ptice">
                              {catItem.price} {currencySymbol}
                            </td>
                            <td className="stock">
                              {catItem.qty * catItem.price} {currencySymbol}
                            </td>
                            <td className="action">
                              <ul>
                                <li className="w-btn" onClick={() => props.removeFromCart(catItem.id)}>
                                  <i className="fi flaticon-delete"></i>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>

                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Button
                          className="theme-btn"
                          onClick={handleProceedToCheckout} // Trigger loading state and PayPal
                        >
                          <Translate contentKey="cart2.proceedToCheckout">Proceed to Checkout</Translate>
                          <i className="fa fa-angle-double-right"></i>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PayPal buttons */}
              {loading && (
                <PayPalScriptProvider options={{ clientId: "ASZqYCLb4pjpMt3Bq2RsQtrtgXYCA9Ido09Za0_GX7bCr5tth3Q4YEMJ9Bp33aL8ACCeaDRnrPjueGQW",currency:'USD', intent:'capture' }}>
                  <ButtonWrapper showSpinner={loading} />
                </PayPalScriptProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    carts: state.cartList.cart,
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartPage);
