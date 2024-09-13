interface ProductProps {
  products: Array<{
    id: number;
    proImg: string;
    offer: string;
    title: string;
    price: number;
    delPrice: number;
  }>;
}

const Product = ({ products }: ProductProps) => {
  return (
    <section className="product-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title">
              <h2>
                Miel <span>100% Frais</span>
              </h2>
              <p>
                Découvrez notre sélection de miels purs et frais, directement
                issus des apiculteurs pour garantir la meilleure qualité et
                saveur. Que ce soit pour la cuisine, les bienfaits pour la santé
                ou comme édulcorant naturel, notre miel apportera douceur et
                bien-être à votre quotidien.
              </p>
            </div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="row align-items-center">
            {products.length > 0 &&
              products.slice(0, 8).map((product, pitem) => (
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
                        <span>{product.offer}</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <h3>{product.title}</h3>
                      <div className="product-btm">
                        <div className="product-price">
                          <ul>
                            <li>{product.price} €</li>
                            <li className="del-price">{product.delPrice} €</li>
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

export default Product;
