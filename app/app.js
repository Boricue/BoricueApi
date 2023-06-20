import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import enviroments from "./config/enviroments";
/*import { LoginRouter } from "./routes/login";
import passport from "passport";*/
import cookieParser from "cookie-parser";
import res from "express/lib/response";
// RUTAS
import usuariosRoutes from "./routes/usuarios.routes.js"
import perrosRoutes from "./routes/usuarios.routes.js"

const app = express();

//settings
app.set("PORT", process.env.PORT || 1000);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

//Rutas
app.get('/', (req, res) => {
    res.send({ message: 'API de Paperros' })
});

//app.use("/auth", loginRouter);

app.use('/api', usuariosRoutes);
app.use('/api', perrosRoutes);


export default app;