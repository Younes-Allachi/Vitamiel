export interface IProduct {
  id?: string; // The product ID (primary identifier)
  idDisabled?: string; // Optional disabled ID field as in backend
  enName?: string; // English name
  esName?: string; // Spanish name
  frName?: string; // French name
  nlName?: string; // Dutch name
  enDescription?: string; // English description
  esDescription?: string; // Spanish description
  frDescription?: string; // French description
  nlDescription?: string; // Dutch description
  origin?: string; // Origin of the product
  weightKg?: number; // Weight of the product in kilograms
  price?: number; // Price of the product
  stockQuantity?: number; // Quantity of stock available
  imageUrl?: string; // URL of the product image
  imageFile?: File | null; // The actual file for image upload (optional)
  categoryId?: string; // Category ID of the product
}

// Default values for the product interface
export const defaultValue: Readonly<IProduct> = {
  id: '', // Default to an empty string if not set
  idDisabled: '', // Default to an empty string if not set
  enName: '', // Default value for English name
  esName: '', // Default value for Spanish name
  frName: '', // Default value for French name
  nlName: '', // Default value for Dutch name
  enDescription: '', // Default value for English description
  esDescription: '', // Default value for Spanish description
  frDescription: '', // Default value for French description
  nlDescription: '', // Default value for Dutch description
  origin: '', // Default origin
  weightKg: 0, // Default weight is 0
  price: 0, // Default price is 0
  stockQuantity: 0, // Default stock quantity is 0
  imageUrl: '', // Default imageUrl is empty string if not set
  imageFile: null, // Default image file is null (optional)
  categoryId: '', // Default category ID is empty string
};
