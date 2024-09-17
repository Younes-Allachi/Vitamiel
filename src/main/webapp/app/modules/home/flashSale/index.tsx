import React from 'react';
import { Translate } from 'react-jhipster'; // Utiliser Translate pour i18n
import Offer from '../countdown';
import './flashSale.scss';

interface ProductType {
  id: number;
  proImg: string;
  title: string;
  offer: string;
  price: number;
  delPrice: number;
}

interface FlashSaleProps {
  products: ProductType[];
}

const FlashSale = ({ products }: FlashSaleProps) => {
  return (
    <section className="flash-Sale-area product-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title">
              <h2>
                <span>
                  <Translate contentKey="flashSale.flash" />
                </span>{' '}
                <span style={{ color: '#b83806' }}>
                  <Translate contentKey="flashSale.sale" />
                </span>{' '}
                <span>
                  <Translate contentKey="flashSale.items" />
                </span>
              </h2>
              <Offer />
            </div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="row align-items-center">
            {products.length > 0 &&
              products.slice(0, 4).map((product, pitem) => (
                <div className="col-lg-3 col-md-6 col-sm-12 col-12" key={pitem}>
                  <div className="product-item">
                    <div className="product-img">
                      <img src={product.proImg} alt={product.title} />
                      <ul>
                        <li>
                          <button>
                            <i className="fi flaticon-shopping-cart"></i>
                          </button>
                        </li>
                        <li>
                          <button>
                            <i className="fi ti-eye"></i>
                          </button>
                        </li>
                        <li>
                          <button>
                            <i className="fi flaticon-like"></i>
                          </button>
                        </li>
                      </ul>
                      <div className="offer-thumb">
                        <span>
                          <Translate contentKey={product.offer} />
                        </span>
                      </div>
                    </div>
                    <div className="product-content">
                      <h3>
                        <Translate contentKey={product.title} />
                      </h3>
                      <div className="product-btm">
                        <div className="product-price">
                          <ul>
                            <li>
                              {product.price} <Translate contentKey="product.currency" />
                            </li>
                            <li className="del-price">
                              {product.delPrice} <Translate contentKey="product.currency" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
