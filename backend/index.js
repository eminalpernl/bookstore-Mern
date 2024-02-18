import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

//Middleware for parsing request body

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send(`Welcome to first step`);
});

// Middleware for parsing  request body
app.use("/books", booksRoutes);

// Middleware for handling CORS Policy
// Option-1: Allow All Orijins with default of cors(*)
app.use(cors());
// Option-2 Allow Custom Origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
