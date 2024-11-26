import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Button, MenuItem, Select, InputLabel, FormControl,SelectChangeEvent  } from '@mui/material';
import { totalPrice } from 'app/shared/util/lists';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from 'app/shared/actions/action';
import { Translate } from 'react-jhipster';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import './CartPage.scss';
import { Link, useNavigate } from 'react-router-dom';

interface CartPageProps {
  carts: CartItem[];
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;  // Add clearCart action
}

interface CartItem {
  id: number;
  enName: string;
  esName: string;
  frName: string;
  nlName: string;
  imageUrl: string;
  name: string;
  qty: number;
  price: number;
}

const CartPage: React.FC<CartPageProps> = (props) => {
  const { carts, incrementQuantity, decrementQuantity, clearCart } = props;
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const currentLocale = useSelector((state: any) => state.locale.currentLocale);
  const [locale, setLocale] = useState(currentLocale);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('USD');
  const [currencySymbol, setCurrencySymbol] = useState<string>('$'); // default USD symbol

  const currencySymbols = {
    EUR: currentLocale === 'fr' ? '€' : '€',
    USD: '$', 
  };

  useEffect(() => {
    setCurrencySymbol(currencySymbols[currency]);
  }, [currency, currentLocale]); 


  const subTotal = totalPrice(carts);
  const vat = subTotal * 0.06;
  const total = subTotal + vat > 0 ? subTotal + vat : 0;

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
      const response = await axios.post('/api/paypal/create-order', {
        total: total.toFixed(2),
        currency: currency,  
      });

      const { paymentId, orderId, approvalUrl } = response.data;

      if (!paymentId || !orderId || !approvalUrl) {
        throw new Error("PayPal Payment ID, Approval URL, or Order ID is missing.");
      }

      return orderId;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw new Error('Failed to create PayPal order');
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      const orderId = order.id;
      const payerId = data.payerID;

      await axios.post('/api/paypal/capture-payment', {
        paymentId: orderId,
        payerId: payerId,
      });

      setLoading(false);

      // After successful payment, clear the cart and navigate to home page
      clearCart();  // Clear the cart
      navigate('/');  // Navigate to home page

      console.log('Payment captured successfully');
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      setLoading(false);
      clearCart();  // Clear the cart
      navigate('/');  // Navigate to home page
    }
  };

  const handleCurrencyChange = (event: SelectChangeEvent<'EUR' | 'USD'>) => {
    setCurrency(event.target.value as 'EUR' | 'USD');
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
                              <p>
                                {currentLocale === 'en' ? catItem.enName :
                                  currentLocale === 'es' ? catItem.esName :
                                    currentLocale === 'fr' ? catItem.frName :
                                      catItem.nlName}
                              </p>
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
                              {(catItem.qty * catItem.price).toFixed(2)} {currencySymbol}
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

                  {/* Currency Selection Dropdown */}
                  <div className="currency-selector">
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Currency</InputLabel>
                      <Select
                        value={currency}
                        onChange={handleCurrencyChange}
                        label="Currency"
                      >
                        <MenuItem value="USD">USD ($)</MenuItem>
                        <MenuItem value="EUR">EUR (€)</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Link className="theme-btn" to="/">
                          <Translate contentKey="cart2.continueShopping">Continue Shopping</Translate>{' '}
                          <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="cart-product-list">
                    <ul>
                      <li>
                        <Translate contentKey="cart2.totalProduct">Total product</Translate>
                        <span>( {carts.length} )</span>
                      </li>
                      <li>
                        <Translate contentKey="cart2.subPrice">Sub Price</Translate>
                        <span>
                          {subTotal.toFixed(2)} {currencySymbol}
                        </span>
                      </li>
                      <li>
                        <Translate contentKey="cart2.vat">VAT (6%)</Translate>
                        <span>
                          {vat.toFixed(2)} {currencySymbol}
                        </span>
                      </li>
                      <li>
                        <Translate contentKey="cart2.deliveryCharge">Delivery Charge</Translate>
                        <span>0 {currencySymbol}</span>
                      </li>
                      <li className="cart-b">
                        <Translate contentKey="cart2.totalPriceOverall">Total Price</Translate>
                        <span>
                          {total.toFixed(2)} {currencySymbol}
                        </span>
                      </li>
                    </ul>
                  </div>

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
                <PayPalScriptProvider options={{ clientId: "ASZqYCLb4pjpMt3Bq2RsQtrtgXYCA9Ido09Za0_GX7bCr5tth3Q4YEMJ9Bp33aL8ACCeaDRnrPjueGQW", currency: currency, intent: 'capture' }}>
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
  clearCart, // Add clearCart action
})(CartPage);
