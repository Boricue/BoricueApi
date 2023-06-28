"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var paseosController = _interopRequireWildcard(require("../controllers/paseos.controller"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = (0, _express.Router)();

// C POST

// CREAR UN PASEO 
router.post('/paseo/', /*paseosController.isValidToken,*/paseosController.postPaseo);

// R GET

// TRAER TODOS LOS PASEOS
router.get('/paseo', /*paseosController.isValidToken,*/paseosController.getTodosPaseos);

// TRAER UN PASEO ESPECIFICO
router.get('/paseo/:id', /*paseosController.isValidToken,*/paseosController.getPaseo);

// U PUT

// MODIFICAR UN PASEO
router.put('/paseo/:id', /*paseosController.isValidToken,*/paseosController.updatePaseo);

// D DELETE

// BORRAR UN PASEO
router["delete"]('/paseo/:id', /*paseosController.isValidToken,*/paseosController.deletePaseo);
var _default = router;
exports["default"] = _default;