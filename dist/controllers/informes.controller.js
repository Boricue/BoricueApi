"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postInforme = exports.getTodosInforme = exports.getInforme = exports.deleteInforme = exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _message = _interopRequireDefault(require("../config/message"));
var _firestore = require("firebase/firestore");
var _firebase = require("../config/database/firebase");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var db = require('../config/database/firebase');
var admin = require("firebase-admin");
// Inicializar Firebase
_firebase.initFirebase;

// C
//Obtener todos los usuarios de la base de datos
var postInforme = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var informe, informeRef, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          informe = {
            "id": "informe" + Math.floor(Math.random() * 99999999) + 1,
            "nombreCompleto": req.body.nombreCompletoInforme,
            "correoElectronico": req.body.correoInforme,
            "asunto": req.body.asuntoInforme,
            "descripcion": req.body.descripcionInforme
          }; // Declarar colección
          informeRef = db.collection('informes'); // Crear el documento y llenar los campos
          _context.next = 5;
          return informeRef.doc(informe.id).set(informe);
        case 5:
          result = _context.sent;
          console.log(result);
          (0, _message["default"])("¡FUNCIONA!", "success");
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          (0, _message["default"])(_context.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function postInforme(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// R
//Traer todos los paseos de la base de datos
exports.postInforme = postInforme;
var getTodosInforme = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var informeRef, querySnapshot, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Obtener la colección de paseos
          informeRef = db.collection('informes'); // Obtener todos los paseos
          _context2.next = 4;
          return informeRef.get();
        case 4:
          querySnapshot = _context2.sent;
          data = []; // Recorrer los documentos y agregar los datos a la matriz 'data'
          querySnapshot.forEach(function (doc) {
            data.push(doc.data());
          });
          res.json(data);
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          (0, _message["default"])(_context2.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getTodosInforme(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//Traer un paseo especifico de la base de datos
exports.getTodosInforme = getTodosInforme;
var getInforme = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$params$id, id, result, doc, data, jsonData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Declarar datos del usuario
          id = (_req$params$id = req.params.id) !== null && _req$params$id !== void 0 ? _req$params$id : "none"; // Declarar colección
          result = db.collection('informes').doc(id);
          _context3.next = 5;
          return result.get();
        case 5:
          doc = _context3.sent;
          data = doc.data();
          jsonData = JSON.stringify(data);
          if (doc.exists) {
            res.json(JSON.parse(jsonData));
          } else {
            console.log('No existe este paseo: ' + id);
            res.json("El paseo " + id + " no existe");
          }
          _context3.next = 16;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          (0, _message["default"])(_context3.t0.message, "danger");
          res.status(500);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function getInforme(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// D
//Borrar o cancelar un paseo
exports.getInforme = getInforme;
var deleteInforme = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var informe, informeRef, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // Datos del usuario
          informe = {
            "id": req.params.id
          }; // Declarar la colección
          informeRef = db.collection('informes'); // Declarar documento y borrarlo
          _context4.next = 5;
          return informeRef.doc(informe.id)["delete"]();
        case 5:
          result = _context4.sent;
          res.json(result);
          (0, _message["default"])("Se borro el informe", "success");
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          (0, _message["default"])(_context4.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function deleteInforme(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteInforme = deleteInforme;
var _default = postInforme;
exports["default"] = _default;