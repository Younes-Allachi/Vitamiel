export interface ICategory {
  id: string;             // Unique identifier for the category
  categoryId: number;     // Category ID
  nameEn: string;         // Name of the category in English
  nameEs: string;         // Name of the category in Spanish
  nameFr: string;         // Name of the category in French
  nameNl: string;         // Name of the category in Dutch
  description?: string;   // Optional description of the category
}

export const defaultValue: ICategory = {
  id: undefined,                  // Default value for ID
  categoryId: 0,           // Default value for category ID
  nameEn: '',              // Default value for name in English
  nameEs: '',              // Default value for name in Spanish
  nameFr: '',              // Default value for name in French
  nameNl: '',              // Default value for name in Dutch
  description: '',         // Default value for description (optional)
};
