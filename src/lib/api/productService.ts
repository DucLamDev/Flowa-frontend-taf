import axiosInstance from './axiosConfig';

interface ProductData {
  name: string;
  description: string;
  brandId: string;
  features?: string[];
  benefits?: string[];
  targetAudience?: string;
  isActive?: boolean;
}

export const productService = {
  createProduct: async (productData: ProductData) => {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  },

  getProducts: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },

  getProductsByBrand: async (brandId: string) => {
    const response = await axiosInstance.get(`/products/brand/${brandId}`);
    return response.data;
  },

  getProductById: async (productId: string) => {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  },

  updateProduct: async (productId: string, productData: Partial<ProductData>) => {
    const response = await axiosInstance.put(`/products/${productId}`, productData);
    return response.data;
  },

  deleteProduct: async (productId: string) => {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  },

  uploadImages: async (productId: string, imageFiles: File[]) => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });
    
    const response = await axiosInstance.post(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
