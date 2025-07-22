// types.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// ✅ Match your backend response exactly
export interface DashboardStats {
  totalOrdersToday: number;
  totalRevenueToday: number;
  mostPopularItem: string;
  activeOrders: number;
}

export interface AppContextType {
  user: User | null;
  token: string | null;
  cartItems: CartItem[];
  customers: User[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;

  dashboardStats: DashboardStats | null;
  fetchDashboardStats: () => Promise<void>;

  isLoading?: boolean;
  error?: string | null;

  userOrders: Order[];
  getMyOrders: () => Promise<void>;
  selectedOrder: Order | null;
  getOrderById: (id: string) => Promise<Order | null>;
  updateOrderStatus: (
    id: string,
    status: string,
    isPaid: boolean
  ) => Promise<void>;

  products: Product[];
  fetchProducts: () => Promise<void>;
  createProduct: (product: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateUserProfile: (
    name: string,
    currentPassword: string,
    password: string
  ) => Promise<void>;
  getUserCart: (userId: string) => Promise<CartItem[]>;
  getUserFavorites: (userId: string) => Promise<Product[]>;
}

export interface Order {
  _id: string;
  items: CartItem[]; // assuming you already have CartItem defined
  user: {
    _id: string;
    name: string;
    email: string;
  };
  totalAmount: number;
  shippingAddress: string;
  orderStatus: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
  isPaid: boolean;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  stock?: number;
}
