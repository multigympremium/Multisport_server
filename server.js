import express from "express";
import environment from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import os from "os";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import routes from "./routes/routes.js";
import admin from "firebase-admin";
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

environment.config();
const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;
connectDB();

const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Socket connected");
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://multisports.com.bd",
      "http://multisports.com.bd",
      "https://king-prawn-app-qkhg8.ondigitalocean.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  })
);

app.use(express.static("public"));
app.use("/api", routes);

app.get("/", (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  const ipAddress = Object.values(networkInterfaces)
    .flat()
    .find((details) => details.family === "IPv4" && !details.internal)?.address;

  res.status(200).json({
    message: `Server is Working. IP address: ${ipAddress}`,
  });
});

app.get("/test-firebase", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers(1);

    res.status(200).json({
      message: "Firebase Admin SDK connected!",
      users: listUsersResult.users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to connect to Firebase Admin SDK",
      error: error.message,
    });
  }
});

app.post("/createFirebaseUser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().createUser({
      email: email,
      password: password,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // console.log(error);
    switch (error.code) {
      case "auth/invalid-email":
        return res.status(400).json({ message: "Invalid email format", error });

      case "auth/email-already-exists":
        return res.status(409).json({ message: "Email already in use", error });

      default:
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
    }
  }
});

app.use(errorHandler);

server.listen(port, () => {
  const networkInterfaces = os.networkInterfaces();
  const ipAddress = Object.values(networkInterfaces)
    .flat()
    .find((details) => details.family === "IPv4" && !details.internal)?.address;

  console.log(`Server started on port ${port} at ${new Date()}.`);
  console.log(`Server IP address: ${ipAddress}`);
});
