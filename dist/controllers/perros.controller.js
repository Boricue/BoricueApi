"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePerros = exports.getPerros = exports.getPerro = exports.deletePerro = exports["default"] = exports.addPerro = void 0;
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

//C
//añadir un perro al usuario
var addPerro = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var paseo, paseoRef, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Declarar datos del usuario
          paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
              "_latitude": req.body.paseoLatitude,
              "_longitude": req.body.paseoLongitude
            },
            "dueno": {
              "id_dueno": req.body.duenoIdPaseo,
              "img_dueno": req.body.duenoImgPaseo,
              "nombre_dueno": req.body.duenoNombrePaseo
            },
            "estado": req.body.estadoPaseo,
            "hora_fin": req.body.horaFinPaseo,
            "hora_inicio": req.body.horaInicioPaseo,
            "medio_de_pago": req.body.medioPagoPaseo,
            "nombre_destino": req.body.nombreDestinoPaseo,
            "paseador": {
              "id_paseador": req.body.paseadorIdPaseo,
              "img_paseador": req.body.paseadorImgPaseo,
              "nombre_paseador": req.body.paseadorNombrePaseo
            },
            "perro": {
              "id_perro": req.body.perroIdPaseo,
              "img_perro": req.body.perroImgPaseo,
              "localizacion": req.body.perroLocalizacionPaseo,
              "nombre_perro": req.body.perroNombrePaseo
            },
            "precio": req.body.precioPaseo
          }; // Declarar colección
          paseoRef = db.collection('paseo'); // Declarar documento y actualizar los campos con los datos del usuario
          _context.next = 5;
          return paseoRef.doc(req.params.id).update(paseo);
        case 5:
          result = _context.sent;
          res.json(result);
          (0, _message["default"])("SI SE PUDO", "success");
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
  return function addPerro(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//R
// Obtener un perro en particular del usuario
exports.addPerro = addPerro;
var getPerro = /*#__PURE__*/function () {
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
  return function getPerro(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Obtener todos los perros del usuario
exports.getPerro = getPerro;
var getPerros = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$params$id2, id, result, doc, data, jsonData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Declarar datos del usuario
          id = (_req$params$id2 = req.params.id) !== null && _req$params$id2 !== void 0 ? _req$params$id2 : "none"; // Declarar colección
          result = db.collection('usuario').doc(id);
          _context3.next = 5;
          return result.get();
        case 5:
          doc = _context3.sent;
          data = doc.data();
          jsonData = JSON.stringify(data);
          if (doc.exists) {
            res.json(JSON.parse(jsonData));
          } else {
            console.log('No existe este usuario: ' + id);
            res.json("El usuario " + id + " no existe");
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
  return function getPerros(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//U
// Actualizar un perro del usuario
exports.getPerros = getPerros;
var updatePerros = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var paseo, paseoRef, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // Declarar datos del usuario
          paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
              "_latitude": req.body.paseoLatitude,
              "_longitude": req.body.paseoLongitude
            },
            "dueno": {
              "id_dueno": req.body.duenoIdPaseo,
              "img_dueno": req.body.duenoImgPaseo,
              "nombre_dueno": req.body.duenoNombrePaseo
            },
            "estado": req.body.estadoPaseo,
            "hora_fin": req.body.horaFinPaseo,
            "hora_inicio": req.body.horaInicioPaseo,
            "medio_de_pago": req.body.medioPagoPaseo,
            "nombre_destino": req.body.nombreDestinoPaseo,
            "paseador": {
              "id_paseador": req.body.paseadorIdPaseo,
              "img_paseador": req.body.paseadorImgPaseo,
              "nombre_paseador": req.body.paseadorNombrePaseo
            },
            "perro": {
              "id_perro": req.body.perroIdPaseo,
              "img_perro": req.body.perroImgPaseo,
              "localizacion": req.body.perroLocalizacionPaseo,
              "nombre_perro": req.body.perroNombrePaseo
            },
            "precio": req.body.precioPaseo
          }; // Declarar colección
          paseoRef = db.collection('paseo'); // Declarar documento y actualizar los campos con los datos del usuario
          _context4.next = 5;
          return paseoRef.doc(req.params.id).update(paseo);
        case 5:
          result = _context4.sent;
          res.json(result);
          (0, _message["default"])("SI SE PUDO", "success");
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
  return function updatePerros(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//D
// Eliminar un perro del usuario
exports.updatePerros = updatePerros;
var deletePerro = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var paseo, paseoRef, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // Declarar datos del usuario
          paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
              "_latitude": req.body.paseoLatitude,
              "_longitude": req.body.paseoLongitude
            },
            "dueno": {
              "id_dueno": req.body.duenoIdPaseo,
              "img_dueno": req.body.duenoImgPaseo,
              "nombre_dueno": req.body.duenoNombrePaseo
            },
            "estado": req.body.estadoPaseo,
            "hora_fin": req.body.horaFinPaseo,
            "hora_inicio": req.body.horaInicioPaseo,
            "medio_de_pago": req.body.medioPagoPaseo,
            "nombre_destino": req.body.nombreDestinoPaseo,
            "paseador": {
              "id_paseador": req.body.paseadorIdPaseo,
              "img_paseador": req.body.paseadorImgPaseo,
              "nombre_paseador": req.body.paseadorNombrePaseo
            },
            "perro": {
              "id_perro": req.body.perroIdPaseo,
              "img_perro": req.body.perroImgPaseo,
              "localizacion": req.body.perroLocalizacionPaseo,
              "nombre_perro": req.body.perroNombrePaseo
            },
            "precio": req.body.precioPaseo
          }; // Declarar colección
          paseoRef = db.collection('paseo'); // Declarar documento y actualizar los campos con los datos del usuario
          _context5.next = 5;
          return paseoRef.doc(req.params.id).update(paseo);
        case 5:
          result = _context5.sent;
          res.json(result);
          (0, _message["default"])("SI SE PUDO", "success");
          _context5.next = 14;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          (0, _message["default"])(_context5.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function deletePerro(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deletePerro = deletePerro;
var _default = getPerros;
exports["default"] = _default;