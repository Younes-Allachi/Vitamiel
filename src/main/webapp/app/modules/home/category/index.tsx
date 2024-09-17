import React from 'react';
import { Translate } from 'react-jhipster';
import './category.scss';

const Category: React.FC = () => {
  return (
    <section className="category-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="category-wrap">
              <div className="category-title">
                <h2>
                  <Translate contentKey="category.title" />
                </h2>
                <p>
                  <Translate contentKey="category.description" />
                </p>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <img src="../../../../content/images/category/icon-1.png" alt="Miel de Reine" />
                </div>
                <div className="category-content">
                  <h2>
                    <Translate contentKey="category.items.reine.title" />
                  </h2>
                  <p>
                    <Translate contentKey="category.items.reine.description" />
                  </p>
                </div>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <img src="../../../../content/images/category/icon-2.png" alt="Miel de Tournesol" />
                </div>
                <div className="category-content">
                  <h2>
                    <Translate contentKey="category.items.tournesol.title" />
                  </h2>
                  <p>
                    <Translate contentKey="category.items.tournesol.description" />
                  </p>
                </div>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <img src="../../../../content/images/category/icon-3.png" alt="Miel de Manuka" />
                </div>
                <div className="category-content">
                  <h2>
                    <Translate contentKey="category.items.manuka.title" />
                  </h2>
                  <p>
                    <Translate contentKey="category.items.manuka.description" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="category-img">
              <img src="../../../../content/images/category/category.jpg" alt="Vue d'ensemble des catégories" />
              <div className="ct-img">
                <img src="../../../../content/images/category/icon-4.png" alt="Pot de miel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
