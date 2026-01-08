// Shared mock product data store
export interface MockProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  originalPrice: number;
  supplier: string;
  shippingTime: string;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  totalRevenue: number;
  status: string;
}

export const mockProducts: Record<string, MockProduct> = {
  "mock-1": {
    id: "mock-1",
    name: "Summer Dress",
    image: "🌸",
    description: "A beautiful summer dress perfect for warm weather occasions. Made with breathable cotton fabric.",
    costPrice: 25.00,
    sellingPrice: 49.99,
    originalPrice: 69.99,
    supplier: "Fashion Wholesale Co.",
    shippingTime: "7-14 days",
    rating: 4.8,
    totalReviews: 124,
    totalOrders: 89,
    totalRevenue: 4449.11,
    status: "published"
  },
  "mock-2": {
    id: "mock-2",
    name: "Winter Jacket",
    image: "🧥",
    description: "Warm and stylish winter jacket with premium insulation. Perfect for cold weather.",
    costPrice: 45.00,
    sellingPrice: 89.99,
    originalPrice: 119.99,
    supplier: "OuterWear Suppliers",
    shippingTime: "10-18 days",
    rating: 4.6,
    totalReviews: 89,
    totalOrders: 67,
    totalRevenue: 6029.33,
    status: "published"
  },
  "mock-3": {
    id: "mock-3",
    name: "Casual Sneakers",
    image: "👟",
    description: "Comfortable everyday sneakers with cushioned soles. Available in multiple sizes.",
    costPrice: 35.00,
    sellingPrice: 79.99,
    originalPrice: 99.99,
    supplier: "Footwear Direct",
    shippingTime: "5-12 days",
    rating: 4.9,
    totalReviews: 203,
    totalOrders: 156,
    totalRevenue: 12478.44,
    status: "published"
  },
  "mock-4": {
    id: "mock-4",
    name: "Designer Handbag",
    image: "👜",
    description: "Elegant designer handbag with premium leather finish. Spacious interior with multiple compartments.",
    costPrice: 55.00,
    sellingPrice: 129.99,
    originalPrice: 179.99,
    supplier: "Luxury Bags Inc.",
    shippingTime: "8-15 days",
    rating: 4.7,
    totalReviews: 156,
    totalOrders: 98,
    totalRevenue: 12739.02,
    status: "published"
  }
};

// Helper to get all products as array
export const getMockProductsArray = () => Object.values(mockProducts);

// Helper to update a product
export const updateMockProduct = (productId: string, updates: Partial<MockProduct>) => {
  if (mockProducts[productId]) {
    mockProducts[productId] = { ...mockProducts[productId], ...updates };
  }
};
