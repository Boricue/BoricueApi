"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.getUser = exports.getPerros = exports["default"] = exports.addDog = void 0;
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

// R
//Obtener todos los usuarios de la base de datos
var getPerros = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var dog, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            dog = {
              id: req.params.id
            }; // Declarar colección
            result = db.collection('usuario').doc(dog.id).get();
            result.then(function (querySnapshot) {
              var data = [];
              querySnapshot.forEach(function (doc) {
                data.push(doc.data());
              });
              var jsonData = JSON.stringify(data);
              res.json(JSON.parse(jsonData));
            });
          } catch (error) {
            (0, _message["default"])(error.message, "danger");
            res.status(500);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getPerros(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
// Obtener un usuario en particular de la base de datos
exports.getPerros = getPerros;
var getUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$params$id, id, result, doc, data, jsonData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Declarar datos del usuario
          id = (_req$params$id = req.params.id) !== null && _req$params$id !== void 0 ? _req$params$id : "none"; // Declarar colección
          result = db.collection('usuario').doc(id);
          _context2.next = 5;
          return result.get();
        case 5:
          doc = _context2.sent;
          data = doc.data();
          jsonData = JSON.stringify(data);
          if (doc.exists) {
            res.json(JSON.parse(jsonData));
          } else {
            console.log('No existe este usuario: ' + id);
            res.json("El usuario " + id + " no existe");
          }
          _context2.next = 16;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          (0, _message["default"])(_context2.t0.message, "danger");
          res.status(500);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function getUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// U
// Actualizar información del usuario
exports.getUser = getUser;
var updateUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Declarar datos del usuario
          user = {
            "id": req.body.id,
            "nombre": req.body.nombre,
            "apellidos": req.body.apellidos,
            "municipio": req.body.municipio,
            "direccion": req.body.direccion,
            "telefono": req.body.telefono,
            "edad": req.body.edad,
            "pais": req.body.pais
          }; // Declarar collección
          usuariosRef = db.collection('usuario'); // Declarar documento y actualizar los campos con los datos del usuario
          _context3.next = 5;
          return usuariosRef.doc(user.id).update({
            nombre: user.nombre,
            apellidos: user.apellidos,
            municipio: user.municipio,
            direccion: user.direccion,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais
          });
        case 5:
          result = _context3.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
          _context3.next = 14;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          (0, _message["default"])(_context3.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function updateUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//TODO: Terminar las funciones de añadir y borrar perros del usuario
// Añadir perros al usuario
exports.updateUser = updateUser;
var addDog = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var dog, perroRef, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // Declarar datos del usuario
          dog = {
            "id": req.body.id,
            "perros": {
              "nombre": req.body.nombre,
              "peso": req.body.nombre_peso,
              "raza": req.body.nombre_raza,
              //    "img": req.body.nombre_perro,
              "estatura": req.body.nombre_estatura,
              "comportamiento": req.body.nombre_comportamiento,
              "vacunas": req.body.nombre_vacunas
            }
          }; // Declarar collecciónes
          perroRef = db.collection('usuario'); // Declarar documento y actualizar los campos con los datos del usuario
          // perros: db.FieldValue.arrayUnion(user.perros),
          _context4.next = 5;
          return perroRef.doc(dog.id).update({
            perros: dog.perros
          });
        case 5:
          result = _context4.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
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
  return function addDog(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.addDog = addDog;
var _default = getPerros;
exports["default"] = _default;