import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Category from "../../components/Category";
import Product from "../../components/Product";
import OfferSection from "../../components/OfferSection";
import FlashSale from "../../components/FlashSale";
import Service from "../../components/Service";
import Testimonial from "../../components/Testimonial";
import Client from "../../components/Client";
import Footer from "../../components/Footer";
import Scrollbar from "../../components/Scrollbar";
import getProducts from "../../api";

const HomePage = () => {
  const productsArray = getProducts();

  const products = productsArray;

  return (
    <>
      <div id="top"></div>
      <Navbar hClass={"header-style-1"} />
      <Hero />
      <Category />
      <Product products={products} />
      <OfferSection />
      <FlashSale products={products} />
      <Service />
      <Testimonial />
      <Client className="client-area" />
      <Footer />
      <Scrollbar />
    </>
  );
};
export default HomePage;
