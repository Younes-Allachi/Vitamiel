import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Checkbox, FormControlLabel } from '@mui/material';
import { totalPrice } from 'app/shared/util/lists';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from 'app/shared/actions/action';
import { Translate } from 'react-jhipster';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import './CartPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';

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
  OrderId: string;
  stockQuantity: number;  // Add stockQuantity here
}

const CartPage: React.FC<CartPageProps> = (props) => {
  const { carts, incrementQuantity, decrementQuantity, clearCart } = props;
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const currentLocale = useSelector((state: any) => state.locale.currentLocale);
  const account = useAppSelector(state => state.authentication.account);

  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [currencySymbol, setCurrencySymbol] = useState<string>('€'); // default USD symbol
  const [termsChecked, setTermsChecked] = useState<boolean>(false);  // New state for checkbox
  const [stockError, setStockErrors] = useState<Record<number, string>>({});  // Correct type

  const translations = {
    en: {
      maxQuantityError: (stockQuantity) => `You can only purchase up to ${stockQuantity} units of this product.`,
      minQuantityError: "Quantity must be greater than 0.",
    },
    fr: {
      maxQuantityError: (stockQuantity) => `Vous pouvez acheter jusqu'à ${stockQuantity} unités de ce produit.`,
      minQuantityError: "La quantité doit être supérieure à 0.",
    },
    es: {
      maxQuantityError: (stockQuantity) => `Solo puedes comprar hasta ${stockQuantity} unidades de este producto.`,
      minQuantityError: "La cantidad debe ser mayor a 0.",
    },
    nl: {
      maxQuantityError: (stockQuantity) => `Je kunt maximaal ${stockQuantity} eenheden van dit product kopen.`,
      minQuantityError: "De hoeveelheid moet groter dan 0 zijn.",
    },
  };

  
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


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(event.target.checked);
  };

  console.log('carts in cart:', carts);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const newQty = parseInt(e.target.value, 10);
    const item = carts.find(cartItem => cartItem.id === itemId);
  
    if (item) {
      // Get the error messages based on the current locale
      const localeMessages = translations[currentLocale];
  
      if (newQty > item.stockQuantity) {
        setStockErrors(prev => ({
          ...prev,
          [itemId]: localeMessages.maxQuantityError(item.stockQuantity),
        }));
      } else if (newQty <= 0) {
        setStockErrors(prev => ({
          ...prev,
          [itemId]: localeMessages.minQuantityError,
        }));
      } else {
        setStockErrors(prev => {
          const { [itemId]: _, ...rest } = prev;
          return rest;
        });
  
        const difference = newQty - item.qty;
        if (difference > 0) {
          // Increment quantity, but ensure it does not exceed stock
          if (item.qty + difference <= item.stockQuantity) {
            Array.from({ length: difference }).forEach(() => incrementQuantity(itemId));
          } else {
            setStockErrors(prev => ({
              ...prev,
              [itemId]: localeMessages.maxQuantityError(item.stockQuantity),
            }));
          }
        } else if (difference < 0) {
          // Decrement quantity
          Array.from({ length: -difference }).forEach(() => decrementQuantity(itemId));
        }
      }
    }
  };
  
  const handleIncrement = (itemId: number) => {
    const item = carts.find(cartItem => cartItem.id === itemId);
    if (item && item.qty < item.stockQuantity) {
      incrementQuantity(itemId);
      setStockErrors(prev => {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      });
    } else {
      const localeMessages = translations[currentLocale];
      setStockErrors(prev => ({
        ...prev,
        [itemId]: localeMessages.maxQuantityError(item.stockQuantity),
      }));
    }
  };
  
  const handleDecrement = (itemId: number) => {
    const item = carts.find(cartItem => cartItem.id === itemId);
    if (item && item.qty > 1) {
      decrementQuantity(itemId);
      setStockErrors(prev => {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      });
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

      await saveOrder(currency, orderId);


      console.log('Payment captured successfully');
    } catch (error) {
      await saveOrder(currency, 'orderId');
      console.error('Error capturing PayPal payment:', error);
      setLoading(false);
      // clearCart();
      // navigate('/');
    }
  };

  const productIds: string[] = (Array.isArray(carts) && carts.length > 0)
    ? carts
      .map(item => item && item.id ? String(item.id) : undefined)
      .filter((id): id is string => id !== undefined)
    : [];


  const quantities: number[] = (Array.isArray(carts) && carts.length > 0)
    ? carts
      .map(item => item && item.qty ? item.qty : undefined)  // Capture the quantity of each item
      .filter((quantity): quantity is number => quantity !== undefined)
    : [];

  const totalAmount = parseFloat(total);

  console.log("productId:", productIds);


  const saveOrder = async (currency: string, orderId: string) => {
    try {
      // Prepare the user data and the order details
      const userData = {
        userId: account.id,
        nom: account.lastName,
        prénom: account.firstName,
        pays: account.deliveryAddress,
        productIds: productIds,
        quantities: quantities,
        username: account.login,
        email: account.email,
        status: 'PAID',
        orderId: orderId
      };

      const orderData = {
        ...userData,
        totalAmount: totalAmount,
        currency: currency
      };

      console.log('Order data before save:', orderData);

      const response = await axios.post('/api/orders/save', orderData);

      if (response.status === 200) {
        console.log('Order saved successfully');
        alert('Order saved!');
        setLoading(false);
        clearCart();
        navigate('/');

      } else {
        console.error('Failed to save the order:', response);
      }
    } catch (error) {
      console.error('Error saving order:', error);
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
    if (!account || !account.id) {
      alert("You must be logged in to proceed with the checkout.");
      return;
    }
    if (!termsChecked) {
      alert("You must read and accept the Terms and Conditions of Sale for Vitamiel.");
      return;
    }


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
                                <Button className="dec qtybutton" onClick={() => handleDecrement(catItem.id)}>
                                  -
                                </Button>
                                <input
                                  type="number"
                                  value={catItem.qty}
                                  min="1"
                                  onChange={e => handleQuantityChange(e, catItem.id)}
                                  className="quantity-input"
                                />
                                <Button className="inc qtybutton" onClick={() => handleIncrement(catItem.id)}>
                                  +
                                </Button>
                              </div>
                              {stockError[catItem.id] && <div className="stock-error">{stockError[catItem.id]}</div>}
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

                  {/* Terms and Conditions Checkbox */}
                  <div className="terms-checkbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={termsChecked}
                          onChange={handleCheckboxChange}
                          name="terms"
                          color="primary"
                        />
                      }
                      label={
                        currentLocale === 'en'
                          ? "I've read the Terms and Conditions of Sale for Vitamiel in the FAQ page."
                          : currentLocale === 'es'
                            ? "He leído los Términos y Condiciones de Venta de Vitamiel en la página de preguntas frecuentes."
                            : currentLocale === 'fr'
                              ? "J'ai lu les Conditions Générales de Vente de Vitamiel dans la page FAQ."
                              : "Ik heb de Algemene Voorwaarden van Vitamiel gelezen op de FAQ-pagina."
                      }
                    />
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
              {loading && account && account.id && (
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
