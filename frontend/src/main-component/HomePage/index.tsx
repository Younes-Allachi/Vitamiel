import Navbar from "../../components/Navbar";
import Hero from "../../components/hero";
import Category from "../../components/Category";
import Product from "../../components/Product";
import OfferSection from "../../components/OfferSection";
import FlashSale from "../../components/FlashSale";
import Service from "../../components/Service";
import Testimonial from "../../components/Testimonial";
import Client from "../../components/Client";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
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
