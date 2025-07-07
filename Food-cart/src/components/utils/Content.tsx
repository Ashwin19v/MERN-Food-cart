import { Clock, ShieldCheck, Bike } from "lucide-react";
export const foodCategories = [
  {
    name: "Rice Dishes",
    img: "https://foodish-api.com/images/biryani/biryani15.jpg",
  },
  {
    name: "Burgers",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    name: "Pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    name: "Pasta",
    img: "https://foodish-api.com/images/pasta/pasta8.jpg",
  },
  {
    name: "Desserts",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
  },
];

export const staticPopularDishes = [
  {
    name: "Chicken Biryani",
    price: 180,
    rating: 4.6,
    time: "20-25 min",
    img: "https://foodish-api.com/images/biryani/biryani10.jpg",
  },
  {
    name: "Veg Pizza",
    price: 120,
    rating: 4.3,
    time: "15-20 min",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    name: "Chocolate Cake",
    price: 90,
    rating: 4.8,
    time: "10-15 min",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
  },
];
export const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Fast Delivery",
    description: "Get your food delivered in under 30 minutes",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Food Safety",
    description: "All restaurants follow strict safety protocols",
  },
  {
    icon: <Bike className="w-6 h-6" />,
    title: "Live Tracking",
    description: "Track your order in real-time",
  },
];

export const testimonials = [
  {
    name: "Aarav",
    avatarUrl: "https://i.pravatar.cc/150?img=30",
    message: "Amazing food and super fast delivery. Loved the packaging!",
  },
  {
    name: "Priya",
    avatarUrl: "https://i.pravatar.cc/150?img=31",
    message: "The sushi was fresh and delicious. Will order again.",
  },
  {
    name: "Ravi",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    message: "I always order my lunch from here. Great taste and quality!",
  },
];
