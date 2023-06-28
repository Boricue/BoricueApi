"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _enviroments = _interopRequireDefault(require("./config/enviroments"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _response = _interopRequireDefault(require("express/lib/response"));
var _usuariosRoutes = _interopRequireDefault(require("./routes/usuarios.routes.js"));
var _paseosRoutes = _interopRequireDefault(require("./routes/paseos.routes.js"));
var _informes = _interopRequireDefault(require("./routes/informes.routes"));
var _reportes = _interopRequireDefault(require("./routes/reportes.routes"));
/*import { LoginRouter } from "./routes/login";
import passport from "passport";*/

// RUTAS

// import perrosRoutes from "./routes/perros.routes.js"

var app = (0, _express["default"])();

//settings
app.set("PORT", process.env.PORT || 1000);

//middlewares
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _morgan["default"])('dev'));
app.use((0, _cookieParser["default"])());

//Rutas
app.get('/', function (req, res) {
  res.send({
    message: 'API de Paperros'
  });
});

//app.use("/auth", loginRouter);

app.use('/api', _usuariosRoutes["default"]);
// app.use('/api', perrosRoutes);
app.use('/api', _paseosRoutes["default"]);
app.use('/api', _reportes["default"]);
app.use('/api', _informes["default"]);
var _default = app;
exports["default"] = _default;