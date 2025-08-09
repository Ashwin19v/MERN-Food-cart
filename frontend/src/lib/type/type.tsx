// types.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  product: Product;
  createdAt?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  items: CartItem[];
  createdAt?: string;
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
    isPaid: boolean,
    deliveryPerson: string,
    estimatedDeliveryTime: string
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
  deleteOrderById: (id: string) => Promise<void>;
  getCustomers: () => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

export interface Order {
  status: any;
  _id: string;
  items: CartItem[]; // assuming you already have CartItem defined
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  totalAmount: number;
  ShippingAddress: string;
  orderStatus:
    | "Pending"
    | "Preparing"
    | "Ready"
    | "Delivered"
    | "Cancelled"
    | "pending"
    | "delivered";
  isPaid: boolean;
  createdAt: string;
  deliveryPerson: string;
  estimatedDeliveryTime: string;
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
