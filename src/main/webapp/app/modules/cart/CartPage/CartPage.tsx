import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import Scrollbar from 'app/modules/home/scrollbar';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { totalPrice } from 'app/shared/util/lists';
import { removeFromCart, incrementQuantity, decrementQuantity } from 'app/shared/actions/action';
import { Translate } from 'react-jhipster';
import './CartPage.scss';

interface CartPageProps {
  carts: CartItem[];
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

interface CartItem {
  id: number;
  title: string;
  proImg: string;
  qty: number;
  price: number;
}

const CartPage: React.FC<CartPageProps> = props => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { carts, incrementQuantity, decrementQuantity } = props;

  const currentLocale = useSelector((state: any) => state.locale.currentLocale);
  const [locale, setLocale] = useState(currentLocale);
  const currencySymbol = locale === 'fr' ? '€' : '$'; // Définir la devise en fonction de la langue

  useEffect(() => {
    setLocale(currentLocale);
  }, [currentLocale]);

  // Calcul du sous-total
  const subTotal = totalPrice(carts);

  // Calcul de la TVA à 6%
  const vat = subTotal * 0.06;

  // Calcul du prix total incluant la TVA
  const total = subTotal + vat;

  // Fonction pour gérer la modification de la quantité
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
                        {carts &&
                          carts.length > 0 &&
                          carts.map((catItem, crt) => (
                            <tr key={crt}>
                              <td className="images">
                                <img src={catItem.proImg} className="img2" alt="" />
                              </td>
                              <td className="product">
                                <ul>
                                  <p>
                                    <Translate contentKey={`product.title3.${catItem.id}`}>{catItem.title}</Translate>
                                  </p>
                                </ul>
                              </td>
                              <td className="stock">
                                <div className="pro-single-btn">
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
                        <Link onClick={ClickHandler} className="theme-btn" to="#">
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
                        <Link onClick={ClickHandler} className="theme-btn" to="#">
                          <Translate contentKey="cart2.proceedToCheckout">Proceed to Checkout</Translate>{' '}
                          <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Scrollbar />
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
