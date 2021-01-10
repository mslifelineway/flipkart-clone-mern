export const baseUrl = `http://localhost:3000`;
export const api = `${baseUrl}/api`;
export const generateProductImagePublicUrl = (fileName) => {
  return `${baseUrl}/public/product-images/${fileName}`;
};

export const generateCategoryImagePublicUrl = (fileName) => {
  return `${baseUrl}/public/product-images/${fileName}`;
};
