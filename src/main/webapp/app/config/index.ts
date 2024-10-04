import data from './data.json';

export interface Product {
  id: number;
  proImg: string;
  offer: string;
  title: string;
  price: number;
  delPrice: number;
  stock: string;
}

const productData: Product[] = data;

const getProducts = (): Product[] => {
  return productData;
};

export default getProducts;
