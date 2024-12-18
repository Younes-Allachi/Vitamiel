import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import Offer from '../countdown';
import './flashSale.scss';

interface ProductType {
  id: number;
  proImg: string;
  title: string;
  offer: string;
  price: number;
  delPrice: number;
  name:string
}

interface FlashSaleProps {
  products: ProductType[];
  addToCartProduct: (product: ProductType) => void;
  addToWishListProduct: (product: ProductType) => void;
}

const FlashSale = ({ products, addToCartProduct, addToWishListProduct }: FlashSaleProps) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = (product: ProductType) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter(product => product?.name?.toLowerCase().includes(searchQuery.toLowerCase()));

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

        {/* Search Bar */}
        <div className="search-bar">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search flash sale items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
            />
            <span className="input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.742a6.5 6.5 0 1 0-1.416 1.416 5.48 5.48 0 0 0 .332.39l4.26 4.261a1 1 0 1 0 1.415-1.415l-4.261-4.26a5.48 5.48 0 0 0-.39-.332zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="product-wrap">
          <div className="row align-items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.slice(0, 4).map((product, pitem) => (
                <div className="col-lg-3 col-md-6 col-sm-12 col-12" key={pitem}>
                  <div className="product-item">
                    <div className="product-img">
                      <img src={product.proImg} alt={product.title} />
                      <ul>
                        <li>
                          <button
                            data-bs-toggle="tooltip"
                            data-bs-html="true"
                            title="Add to Cart"
                            onClick={() => addToCartProduct(product)}
                          >
                            <i className="fi flaticon-shopping-cart"></i>
                          </button>
                        </li>
                        <li>
                          <button data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" onClick={() => handleClickOpen(product)}>
                            <i className="fi ti-eye"></i>
                          </button>
                        </li>
                        <li>
                          <button
                            data-bs-toggle="tooltip"
                            data-bs-html="true"
                            title="Add to Wishlist"
                            onClick={() => addToWishListProduct(product)}
                          >
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
                              {(product.price * 1.06).toFixed(2)} <Translate contentKey="product.currency" />
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
              ))
            ) : (
              <div className="col-12">
                <p>No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
