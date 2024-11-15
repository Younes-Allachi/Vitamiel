export interface IProduct {
    id?: any;
    name?: string;
    description?: string;
    origin?: string;
    weightKg?: number;
    price?: number;
    stockQuantity?: number;
    imageUrl?: string;
    categoryId?: any;
  }
  
  export const defaultValue: Readonly<IProduct> = {
    id: '',
    name: '',
    description: '',
    origin: '',
    weightKg: 0,
    price: 0,
    stockQuantity: 0,
    imageUrl: '',
    categoryId: '',
  };
  