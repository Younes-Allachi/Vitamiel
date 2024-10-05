import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishList, addToCart } from 'app/shared/actions/action';
import { Translate } from 'react-jhipster';

interface WishlistItem {
  id: number;
  title: string;
  proImg: string;
  price: number;
  stock: string;
}

interface WishlistPageProps {
  wishs: WishlistItem[];
  removeFromWishList: (id: number) => void;
  addToCart: (item: WishlistItem) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = props => {
  const { wishs, addToCart, removeFromWishList } = props;

  const currentLocale = useSelector((state: any) => state.locale.currentLocale);
  const [locale, setLocale] = useState(currentLocale);
  const currencySymbol = locale === 'fr' ? '€' : '$'; // Définir la devise en fonction de la langue

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  useEffect(() => {
    setLocale(currentLocale);
  }, [currentLocale]);

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
                            <Translate contentKey="wishlist.image">Image</Translate>
                          </th>
                          <th className="product-2">
                            <Translate contentKey="wishlist.productName">Product Name</Translate>
                          </th>
                          <th className="ptice">
                            <Translate contentKey="wishlist.price">Price</Translate>
                          </th>
                          <th className="pr">
                            <Translate contentKey="wishlist.stock">Stock Status</Translate>
                          </th>
                          <th className="remove remove-b">
                            <Translate contentKey="wishlist.action">Action</Translate>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishs &&
                          wishs.length > 0 &&
                          wishs.map((wish, crt) => (
                            <tr key={crt}>
                              <td className="images">
                                <img src={wish.proImg} className="img2" alt="" />
                              </td>
                              <td className="product">
                                <ul>
                                  <p>
                                    <Translate contentKey={`product.title3.${wish.id}`}>{wish.title}</Translate>
                                  </p>
                                </ul>
                              </td>
                              <td className="ptice">
                                {wish.price} {currencySymbol}
                              </td>
                              <td className="stock">
                                <ul>
                                  <p className="stock-status">
                                    <Translate contentKey={`product.stock.${wish.id}`}>{wish.stock}</Translate>
                                  </p>
                                </ul>
                              </td>
                              <td className="action">
                                <ul>
                                  <li className="c-btn">
                                    <button type="button" onClick={() => addToCart(wish)} title="Add to Cart" className="c-btn">
                                      <i className="fi flaticon-shopping-cart"></i>
                                    </button>
                                  </li>
                                  <li className="w-btn">
                                    <button type="button" onClick={() => removeFromWishList(wish.id)}>
                                      <i className="fi flaticon-delete"></i>
                                    </button>
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
                        <Link onClick={ClickHandler} className="theme-btn" to="/cart">
                          <Translate contentKey="cart2.viewCart">View Cart</Translate> <i className="fa fa-angle-double-right"></i>
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
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    wishs: state.wishList.w_list,
  };
};

export default connect(mapStateToProps, { removeFromWishList, addToCart })(WishlistPage);
