import data from './data.json';
import axios from 'axios';

// Define the Product interface
export interface Product {
  id: number;
  proImg: string;
  offer: string;
  title: string;
  price: number;
  delPrice: number;
  stock: string;
}

// Define the Category interface
export interface Category {
  categoryId: string;
  name: string;
}


const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>('/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>('/api/categories'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};

export { getProducts, getCategories };
