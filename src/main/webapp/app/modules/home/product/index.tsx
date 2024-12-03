import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import './product.scss';

interface ProductProps {
  products: Array<{
    id: string;
    imageUrl: string;
    enName: string;
    esName: string;
    frName: string;
    nlName: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: string;
  }>;
  categories: Array<{
    categoryId: string;
    name: string;
    nameEs: string;
    nameEn: string;
    nameFr: string;
    nameNl: string;
  }>;
  addToCartProduct: (product: any) => void;
  addToWishListProduct: (product: any) => void;
  currentLocale: string;
}

const Product = ({
  products,
  categories,
  addToCartProduct,
  addToWishListProduct,
  currentLocale
}: ProductProps) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonProducts, setComparisonProducts] = useState<Array<any>>([]);

  console.log('Categories in product page:', categories);
  const handleClickOpen = (product: any) => {
    setOpen(true);
    setState(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToComparison = (product: any) => {
    if (comparisonProducts.length < 2 && !comparisonProducts.some(p => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const handleCompare = () => {
    if (comparisonProducts.length === 2) {
      setOpen(true);
    }
  };

  const filteredProducts = products.filter(product => {
    const searchQueryLower = searchQuery.toLowerCase();
    const namesToCheck = [
      product?.enName?.toLowerCase(),
      product?.esName?.toLowerCase(),
      product?.frName?.toLowerCase(),
      product?.nlName?.toLowerCase()
    ];

    return namesToCheck.some(name => name.includes(searchQueryLower));
  });

  const groupedProducts = categories.map((category) => ({
    ...category,
    products: filteredProducts.filter((product) => String(product.categoryId) === String(category.categoryId)),
  }));

  const getProductName = (product: any) => {
    switch (currentLocale) {
      case 'es':
        return product.esName;
      case 'fr':
        return product.frName;
      case 'nl':
        return product.nlName;
      default:
        return product.enName;
    }
  };
  const getProductDescription = (product: any) => {
    switch (currentLocale) {
      case 'es':
        return product.esDescription;
      case 'fr':
        return product.frDescription;
      case 'nl':
        return product.nlDescription;
      default:
        return product.enDescription;
    }
  };

  const getCategoryName = (category: any) => {
    switch (currentLocale) {
      case 'es':
        return category.nameEs;
      case 'fr':
        return category.nameFr;
      case 'nl':
        return category.nameNl;
      default:
        return category.nameEn;
    }
  };


  return (
    <section className="product-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 offset-lg-3">
            <div className="section-title">
              <h3>
                <span style={{ color: '#b83806' }}>
                  <Translate contentKey="product.title1" />
                </span>{' '}
                <span>
                  <Translate contentKey="product.fresh" />
                </span>
              </h3>
              <p>
                <Translate contentKey="product.description" />
              </p>
            </div>
          </div>
        </div>

        {/* Centered Search Bar with Icon */}
        <div className="search-bar">
          <div className="input-group">
            <label htmlFor="search">
              <Translate contentKey="search" />
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {comparisonProducts.length === 2 && (
          <div className="compare-btn-container">
            <button className="btn btn-primary" onClick={handleCompare}>
              Compare Selected Products
            </button>
          </div>
        )}

        <div className="product-wrap">
          {groupedProducts.map((category) => (
            <div key={category.categoryId}>
              <h3>{getCategoryName(category)}</h3>

              <div className="row align-items-center">
                {category.products.length > 0 ? (
                  category.products.map((product, pitem) => (
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12" key={pitem} style={{ height: '450px' }}>
                      <div className="product-item">
                        <div className="product-img">
                          <img src={`http://localhost:8080/${product.imageUrl}`} alt={product.enName} />
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
                              <button data-bs-toggle="tooltip" data-bs-html="true" title="Quick View" onClick={() => handleAddToComparison(product)}>
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
                        </div>
                        <div className="product-content">
                          <h3>{getProductName(product)}</h3>
                          <h6>{getProductDescription(product)}</h6>
                          <div className="product-btm">
                            <div className="del-price">
                              <ul>
                                <li>
                                  {(product.price * 1.06).toFixed(2)} <Translate contentKey="product.currency" />
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
                    <Translate contentKey="userManagement.product.noProduct" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Comparison */}
      {comparisonProducts.length === 2 && (
        <div className="modal fade show" id="comparisonModal" tabIndex={-1} style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} aria-hidden="true">
          <div className="modal-dialog modal-lg" style={{ marginTop: '7%' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><Translate contentKey="userManagement.product.productComparison" /></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setComparisonProducts([])}></button>
              </div>
              <div className="modal-body">
                <div className="comparison-wrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/* Comparison Item 1 */}
                  <div className="comparison-item" style={{ width: '48%' }}>
                    <img src={comparisonProducts[0].imageUrl} alt={comparisonProducts[0].name} style={{ objectFit: 'cover', maxWidth: '350px', maxHeight: '350px' }} />
                    <h4>{getProductName(comparisonProducts[0])}</h4>
                    <h6>{getProductDescription(comparisonProducts[0])}</h6>

                    <p> <Translate contentKey="product.price" />:{(comparisonProducts[0].price * 1.06).toFixed(2)} <Translate contentKey="product.currency" /></p>
                  </div>

                  {/* Comparison Item 2 */}
                  <div className="comparison-item" style={{ width: '48%' }}>
                    <img src={comparisonProducts[1].imageUrl} alt={comparisonProducts[1].name} style={{ objectFit: 'cover', maxWidth: '350px', maxHeight: '350px' }} />
                    <h4>{getProductName(comparisonProducts[1])}</h4>
                    <h6>{getProductDescription(comparisonProducts[1])}</h6>
                    <p><Translate contentKey="product.price" />:{(comparisonProducts[1].price * 1.06).toFixed(2)} <Translate contentKey="product.currency" /></p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setComparisonProducts([])}>
                  <Translate contentKey="gdprModal.closeButton" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
