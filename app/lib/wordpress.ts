import axios from 'axios';

const WORDPRESS_API_URL = 'https://thejeweljaipur.com/wp-json';
const WC_API_URL = `${WORDPRESS_API_URL}/wc/v3`;

// WooCommerce API keys
const consumer_key = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const consumer_secret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

interface ProductFilters {
  category?: string;
  stock_status?: string;
  search?: string;
  per_page?: number;
}

// Create axios instance with default params
const wooCommerceApi = axios.create({
  baseURL: WC_API_URL,
});

// Add authentication to every request
wooCommerceApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    consumer_key,
    consumer_secret,
  };
  return config;
});

export async function getProducts(filters?: ProductFilters) {
  try {
    const params = {
      ...filters,
      per_page: 20, // Limit results per page
    };

    const response = await wooCommerceApi.get('/products', { params });
    console.log('Products fetched:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getCategories() {
  try {
    const params = {
      per_page: 100, // Get more categories
      hide_empty: true, // Only show categories with products
    };

    const response = await wooCommerceApi.get('/products/categories', { params });
    console.log('Categories fetched:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getProduct(id: number) {
  try {
    const response = await wooCommerceApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
    throw new Error('Failed to fetch product');
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post(`${WORDPRESS_API_URL}/jwt-auth/v1/token`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
}