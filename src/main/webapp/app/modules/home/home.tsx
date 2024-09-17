import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Alert, Col, Row } from 'reactstrap';

import { useAppSelector } from 'app/config/store';
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

export const Home = () => {
  const productsArray = getProducts();

  const products = productsArray;

  const account = useAppSelector(state => state.authentication.account);

  return (
    <>
      <div id="top"></div>
      <Hero />
      <Category />
      <Product products={products} />
      <Offer />
      <FlashSale products={products} />
      <Service />
      <Testimonial />
      <Client className="client-area" />
      <Scrollbar />
    </>
  );
};

export default Home;
