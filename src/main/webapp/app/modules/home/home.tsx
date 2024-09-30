import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/config/store';
import { connect } from 'react-redux';
import { addToCart, addToWishList } from '../../shared/actions/action';
import Hero from 'app/modules/home/hero';
import Category from 'app/modules/home/category';
import Product from 'app/modules/home/product';
import Offer from 'app/modules/home/offer';
import FlashSale from 'app/modules/home/flashSale';
import Service from 'app/modules/home/service';
import Testimonial from 'app/modules/home/testimonial';
import Client from 'app/modules/home/client';
import Scrollbar from 'app/modules/home/scrollbar';
import getProducts from '../../config';

export const Home = ({ addToCart, addToWishList }) => {
  const [products, setProducts] = useState([]);
  const account = useAppSelector(state => state.authentication.account);
  const currentLocale = useAppSelector(state => state.locale.currentLocale); // Ecoute l'état de la langue

  useEffect(() => {
    // Simulez un appel asynchrone pour récupérer les produits
    const fetchProducts = async () => {
      const productsArray = await getProducts();
      setProducts(productsArray);
    };

    fetchProducts();
  }, [currentLocale]); // Recharger les produits à chaque changement de langue

  const addToCartProduct = (product, qty = 1) => {
    addToCart(product, qty, null, null);
  };

  const addToWishListProduct = product => {
    addToWishList(product);
  };

  return (
    <>
      <div id="top"></div>
      <Hero />
      <Category />
      {products.length > 0 ? (
        <>
          <Product addToCartProduct={addToCartProduct} addToWishListProduct={addToWishListProduct} products={products} />
          <FlashSale addToCartProduct={addToCartProduct} addToWishListProduct={addToWishListProduct} products={products} />
        </>
      ) : (
        <div>Loading products...</div>
      )}
      <Offer />
      <Service />
      <Testimonial />
      <Client className="client-area" />
      <Scrollbar />
    </>
  );
};

export default connect(null, { addToCart, addToWishList })(Home);
