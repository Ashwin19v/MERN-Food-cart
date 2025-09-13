export interface User {
  _id: string;
  name: string;
  email: string;

  phone?: string;
  address?: string;
}
export interface UserData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}
export type FormData = {
  name: string;
  phone: string;
  address: string;
  currentPassword: string;
  newPassword: string;
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  reviews?: number;
  rating?: number;
}
export interface CartItem {
  _id: string;
  product: Product;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface Dish {
  name: string;
  price: number;
  rating: number;
  time: string;
  img: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export interface Order {
  _id: string;
  items: CartItem[];
  orderStatus: "pending" | "confirmed" | "delivered" | "cancelled";
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
  isPaid: boolean;
  paymentMethod: string;
}

export interface Review {
  _id: string;
  length: number;
  rating: number;
  comment: string;
  user: {
    _id: string;
    name: string;
  };
  product: string;
  createdAt: string;
}

export interface FavoriteItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface Message {
  from: string;
  fromModel?: "User" | "Admin";
  to?: string;
  toModel?: "User" | "Admin";
  message: string;
  timestamp?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  rating?: number;
  image: string;
  // add other fields like description, category, etc., if needed
}

export interface StoreContextType {
  // Auth
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  userData: User | null;
  formData: FormData | null;
  setUserData: React.Dispatch<React.SetStateAction<User>>;

  // Cart
  cartItems: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  getCartItems: () => Promise<void>;

  // Orders
  orders: Order[];
  getOrders: () => Promise<void>;
  createOrder: (orderData: Partial<Order>) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;

  // Favorites
  favorites: FavoriteItem[];
  getFavorites: () => Promise<void>;
  addToFavorites: (productId: string) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;

  // Reviews
  // reviews: Review[];
  // setReviews: React.Dispatch<React.SetStateAction<Review[] | []>>;
  getProductReviews: (productId: string) => Promise<void>;
  addReview: (
    productId: string,
    rating: number,
    comment: string
  ) => Promise<void>;
  updateReview: (
    reviewId: string,
    rating: number,
    comment: string
  ) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  handleReviewDelete: (reviewId: string) => Promise<void>;

  // UI State
  isLoading: boolean;
  // loading:boolean;
  error: string | null;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;

  fetchPopularProducts: () => Promise<void>;
  // handleSeeMoreClick: () => void;
  popularProducts: any[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;

  fetchProductsByCategory: (categoryName: string) => Promise<any[]>;
  categoryProducts: any[];
  setCategoryProducts: React.Dispatch<React.SetStateAction<any[]>>;

  fetchProductById: (productId: string) => Promise<Product | null>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  updateUserProfile: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  fetchAdminList: () => Promise<any[]>;
}
export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};
