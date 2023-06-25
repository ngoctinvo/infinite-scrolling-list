import { ProductType } from "../types/product";

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (skip: number = 0, limit: number = 0): Promise<ProductType[]> => {
  try {
    const response = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const searchProduct = async (key: string = ''): Promise<ProductType[]> => {
  try {
    const response = await fetch(`${API_URL}/search?q=${key}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};