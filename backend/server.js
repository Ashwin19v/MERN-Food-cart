const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Chat = require("./models/chatServiceModel/Chat");

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://mern-food-cart.vercel.app",
    ],
  },
});

const users = {};

io.on("connection", (socket) => {
  // Identify user
  socket.on("join", ({ userId, role }) => {
    users[userId] = socket.id;
    socket.data.userId = userId;
    socket.data.role = role;
  });

  // Handle sending messages
  socket.on(
    "chatMessage",
    async ({ from, fromModel, to, toModel, message }) => {
      try {
        const chatMsg = new Chat({
          from,
          fromModel,
          to,
          toModel,
          message,
        });

        await chatMsg.save();
      } catch (err) {
        console.error("Error saving chat message:", err);
      }

      // Emit to recipient
      const targetSocketId = users[to];
      if (targetSocketId) {
        io.to(targetSocketId).emit("chatMessage", { from, message });
      }
    },
  );

  socket.on("disconnect", () => {
    Object.keys(users).forEach((key) => {
      if (users[key] === socket.id) delete users[key];
    });
  });
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://mern-food-cart.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const favoriteRoutes = require("./routes/favRoutes");
// Admin
const adminUserRoutes = require("./routes/Admin/authRoute");
const adminProductRoutes = require("./routes/Admin/productRoute");
const adminOrderRoutes = require("./routes/Admin/orderRoute");
const adminDashboardRoutes = require("./routes/Admin/dashboardRoute");
const adminFavRoutes = require("./routes/Admin/favRoute");
const adminCartRoutes = require("./routes/Admin/cartRoute");
//chat
const fetchAdminRoutes = require("./routes/fetchAdmin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);

//Admin Routes
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/favorites", adminFavRoutes);
app.use("/api/admin/cart", adminCartRoutes);
//chat
app.use("/api/chat", fetchAdminRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
