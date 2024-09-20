import React from 'react';
import { Translate } from 'react-jhipster';
import './category2.scss';

interface Category2Props {
  StyleClass?: string;
}

const Category2: React.FC<Category2Props> = ({ StyleClass }) => {
  return (
    <section className={`category-area-s2 section-padding ${StyleClass}`}>
      <div className="container">
        <div className="category-wrap">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-12">
              <div className="category-item">
                <div className="category-icon">
                  <img src="../../../../content/images/category/icon-1.png" alt="Queen Bee Honey" />
                </div>
                <div className="category-content">
                  <h2>
                    <Translate contentKey="category2.queenBeeHoneyTitle">Miel de Reine</Translate>
                  </h2>
                  <p>
                    <Translate contentKey="category2.queenBeeHoneyDescription">
                      Le miel de reine est riche en nutriments et est souvent considéré comme un aliment de luxe. Il est récolté avec soin
                      pour préserver sa pureté et ses propriétés bénéfiques pour la santé.
                    </Translate>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-12">
              <div className="category-item">
                <div className="category-icon">
                  <img src="../../../../content/images/category/icon-2.png" alt="Sunflower Honey" />
                </div>
                <div className="category-content">
                  <h2>
                    <Translate contentKey="category2.sunflowerHoneyTitle">Miel de Tournesol</Translate>
                  </h2>
                  <p>
                    <Translate contentKey="category2.sunflowerHoneyDescription">
                      Le miel de tournesol est apprécié pour son goût doux et légèrement fruité. C est une source naturelle d énergie et il
                      est parfait pour sucrer vos boissons ou plats préférés.
                    </Translate>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-12">
              <div className="category-item">
                <div className="category-icon">
                  <img src="../../../../content/images/category/icon-3.png" alt="Manuka Honey" />
                </div>
                <div className="category-content">
                  <h2>
                    <Translate contentKey="category2.manukaHoneyTitle">Miel de Manuka</Translate>
                  </h2>
                  <p>
                    <Translate contentKey="category2.manukaHoneyDescription">
                      Le miel de Manuka, originaire de Nouvelle-Zélande, est réputé pour ses propriétés médicinales uniques. Il est souvent
                      utilisé pour améliorer la santé digestive et renforcer le système immunitaire.
                    </Translate>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category2;
