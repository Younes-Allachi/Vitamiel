import catimg from "../../images/category/icon-1.png";
import catimg2 from "../../images/category/icon-2.png";
import catimg3 from "../../images/category/icon-3.png";
import catimg4 from "../../images/category/icon-4.png";
import catimg5 from "../../images/category/category.jpg";

const Category: React.FC = () => {
  return (
    <section className="category-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="category-wrap">
              <div className="category-title">
                <h2>Notre Gamme de Miel</h2>
                <p>
                  Découvrez notre sélection de miels de haute qualité, chacun
                  offrant un profil de saveur unique et des bienfaits pour la
                  santé. Que vous cherchiez un ajout sucré pour vos repas ou un
                  remède naturel, notre gamme a quelque chose pour tout le
                  monde.
                </p>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <img src={catimg} alt="Miel de Reine" />
                </div>
                <div className="category-content">
                  <h2>Miel de Reine</h2>
                  <p>
                    Notre Miel de Reine est récolté dans des ruches de qualité
                    supérieure et se distingue par sa couleur dorée riche et sa
                    texture lisse. Idéal pour ceux qui apprécient un goût de
                    miel traditionnel avec une légère touche florale.
                  </p>
                </div>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <img src={catimg2} alt="Miel de Tournesol" />
                </div>
                <div className="category-content">
                  <h2>Miel de Tournesol</h2>
                  <p>
                    Ce miel est issu des tournesols, offrant une saveur légère
                    et brillante avec une touche d'agrumes. Il est parfait pour
                    sucrer vos thés, salades ou desserts légers.
                  </p>
                </div>
              </div>
              <div className="category-item">
                <div className="category-icon">
                  <img src={catimg3} alt="Miel de Manuka" />
                </div>
                <div className="category-content">
                  <h2>Miel de Manuka</h2>
                  <p>
                    Originaire de Nouvelle-Zélande, le miel de Manuka est réputé
                    pour ses puissantes propriétés médicinales. Il est riche en
                    qualités antibactériennes, ce qui le rend idéal pour apaiser
                    les maux de gorge et renforcer votre système immunitaire.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="category-img">
              <img src={catimg5} alt="Vue d'ensemble des catégories" />
              <div className="ct-img">
                <img src={catimg4} alt="Pot de miel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
