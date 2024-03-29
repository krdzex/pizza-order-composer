import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import orderRoutes from "./routes/order.routes"
import doughRoutes from "./routes/dough.routes"
import ingredientRoutes from "./routes/ingredients.route"
import addressRoutes from "./routes/address.routes"

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(compression())
app.use(cors())
app.use(helmet())
app.use("/",userRoutes)
app.use("/",authRoutes)
app.use("/",orderRoutes)
app.use("/",doughRoutes)
app.use("/",ingredientRoutes)
app.use("/",addressRoutes)

export default app;