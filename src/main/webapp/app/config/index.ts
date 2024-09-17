import data from './data.json';

export interface Product {
  id: number;
  proImg: string;
  offer: string;
  title: string;
  price: number;
  delPrice: number;
}

const productData: Product[] = data;

const getProducts = (): Product[] => {
  return productData;
};

export default getProducts;
