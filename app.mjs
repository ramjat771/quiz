import express from "express";
import routes from "./routes/routes.mjs";
import { errorHandler } from "./middlewares/error_handler.mjs";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*", // ya specific origin: "http://192.168.1.105:3000"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use('/web', express.static('web'));
 app.use("/api", routes);
app.use(errorHandler);

export default app;





