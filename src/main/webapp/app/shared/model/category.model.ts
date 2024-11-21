export interface ICategory {
    id: string;
    categoryId: number;
    name: string;
    description?: string; // Optional, as it may not always be provided
  }
  
  export const defaultValue: ICategory = {
    id: undefined,
    categoryId: 0,
    name: '',
    description: '',
  };
  