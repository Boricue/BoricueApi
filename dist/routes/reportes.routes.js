"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var reportesController = _interopRequireWildcard(require("../controllers/reportes.controller"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = (0, _express.Router)();

// C POST

// CREAR UN REPORTE 
router.post('/Reporte/', /*paseosController.isValidToken,*/reportesController.postReporte);

// R GET

// TRAER TODOS LOS REPORTES
router.get('/Reporte', /*paseosController.isValidToken,*/reportesController.getTodosReporte);

// TRAER UN PASEO REPORTE ESPECIFICO
router.get('/Reporte/:id', /*paseosController.isValidToken,*/reportesController.getReporte);

// D DELETE

// BORRAR UN REPORTE
router["delete"]('/Reporte/:id', /*paseosController.isValidToken,*/reportesController.deleteReporte);
var _default = router;
exports["default"] = _default;