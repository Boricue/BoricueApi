"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePaseo = exports.postPaseo = exports.getTodosPaseos = exports.getPaseo = exports.deletePaseo = exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _message = _interopRequireDefault(require("../config/message"));
var _firestore = require("firebase/firestore");
var _firebase = require("../config/database/firebase");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _expressValidator = require("express-validator");
var db = require('../config/database/firebase');
var admin = require("firebase-admin");
// Inicializar Firebase
_firebase.initFirebase;

// C
//Obtener todos los usuarios de la base de datos
var postPaseo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, fechaActual, year, month, day, hours, minutes, seconds, paseo, paseoRef, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _expressValidator.body)('autor').notEmpty().exists().isEmail().run(req);
        case 3:
          _context.next = 5;
          return (0, _expressValidator.body)('titulo').notEmpty().exists().isString().run(req);
        case 5:
          _context.next = 7;
          return (0, _expressValidator.body)('descripcion').notEmpty().exists().isString().run(req);
        case 7:
          _context.next = 9;
          return (0, _expressValidator.body)('tipo').notEmpty().exists().isString().run(req);
        case 9:
          _context.next = 11;
          return (0, _expressValidator.body)('estado').notEmpty().exists().isString().run(req);
        case 11:
          _context.next = 13;
          return (0, _expressValidator.body)('hora_fin').notEmpty().exists().isString().run(req);
        case 13:
          _context.next = 15;
          return (0, _expressValidator.body)('hora_inicio').notEmpty().exists().isString().run(req);
        case 15:
          _context.next = 17;
          return (0, _expressValidator.body)('precio').notEmpty().exists().isString().run(req);
        case 17:
          _context.next = 19;
          return (0, _expressValidator.body)('medio_de_pago').notEmpty().exists().isString().run(req);
        case 19:
          _context.next = 21;
          return (0, _expressValidator.body)('paseador').notEmpty().exists().isObject().run(req);
        case 21:
          _context.next = 23;
          return (0, _expressValidator.body)('perro').notEmpty().exists().isArray().run(req);
        case 23:
          errors = (0, _expressValidator.validationResult)(req);
          if (errors.isEmpty()) {
            _context.next = 27;
            break;
          }
          (0, _message["default"])("Error en las validaciones", "danger");
          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 27:
          // Obtener fecha actual
          fechaActual = new Date(); // Obtener componentes de la fecha
          year = fechaActual.getFullYear();
          month = fechaActual.getMonth() + 1;
          day = fechaActual.getDate();
          hours = fechaActual.getHours();
          minutes = fechaActual.getMinutes();
          seconds = fechaActual.getSeconds();
          paseo = {
            "id": "paseo".concat(year).concat(month).concat(day).concat(hours).concat(minutes).concat(seconds),
            "autor": req.body.autor,
            "titulo": req.body.titulo,
            "descripcion": req.body.descripcion,
            "destino": {
              "_latitude": req.body.destino._latitude,
              "_longitude": req.body.destino._longitude
            },
            "tipo": req.body.tipo,
            "nombre_destino": req.body.nombre_destino,
            "estado": "programado",
            "hora_fin": req.body.hora_fin,
            "hora_inicio": req.body.hora_inicio,
            "precio": req.body.precio,
            "medio_de_pago": req.body.medio_de_pago,
            "paseador": req.body.paseador,
            "perro": req.body.perro
          };
          console.log(paseo.id);
          // Declarar colección
          paseoRef = db.collection('paseo'); // Crear el documento y llenar los campos
          _context.next = 39;
          return paseoRef.doc(paseo.id).set(paseo);
        case 39:
          result = _context.sent;
          res.json(result);
          (0, _message["default"])("¡FUNCIONA!", "success");
          _context.next = 48;
          break;
        case 44:
          _context.prev = 44;
          _context.t0 = _context["catch"](0);
          (0, _message["default"])(_context.t0.message, "danger");
          res.status(500);
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 44]]);
  }));
  return function postPaseo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// R
//Traer todos los paseos de la base de datos
exports.postPaseo = postPaseo;
var getTodosPaseos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var paseosRef, querySnapshot, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          //const paseoId = req.params.id;
          // Obtener la colección de paseos
          paseosRef = db.collection('paseo'); // Obtener todos los paseos
          _context2.next = 4;
          return paseosRef.get();
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
  return function getTodosPaseos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//Traer un paseo especifico de la base de datos
exports.getTodosPaseos = getTodosPaseos;
var getPaseo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$params$id, id, result, doc, data, jsonData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Declarar datos del usuario
          id = (_req$params$id = req.params.id) !== null && _req$params$id !== void 0 ? _req$params$id : "none"; // Declarar colección
          result = db.collection('paseo').doc(id);
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
  return function getPaseo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// U
//Modifica un paseo 
exports.getPaseo = getPaseo;
var updatePaseo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var errors, paseo, paseoRef, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _expressValidator.body)('autor').notEmpty().exists().isEmail().run(req);
        case 3:
          _context4.next = 5;
          return (0, _expressValidator.body)('titulo').notEmpty().exists().isString().run(req);
        case 5:
          _context4.next = 7;
          return (0, _expressValidator.body)('descripcion').notEmpty().exists().isString().run(req);
        case 7:
          _context4.next = 9;
          return (0, _expressValidator.body)('tipo').notEmpty().exists().isString().run(req);
        case 9:
          _context4.next = 11;
          return (0, _expressValidator.body)('estado').notEmpty().exists().isString().run(req);
        case 11:
          _context4.next = 13;
          return (0, _expressValidator.body)('hora_fin').notEmpty().exists().isString().run(req);
        case 13:
          _context4.next = 15;
          return (0, _expressValidator.body)('hora_inicio').notEmpty().exists().isString().run(req);
        case 15:
          _context4.next = 17;
          return (0, _expressValidator.body)('precio').notEmpty().exists().isString().run(req);
        case 17:
          _context4.next = 19;
          return (0, _expressValidator.body)('medio_de_pago').notEmpty().exists().isString().run(req);
        case 19:
          _context4.next = 21;
          return (0, _expressValidator.body)('paseador').notEmpty().exists().isObject().run(req);
        case 21:
          _context4.next = 23;
          return (0, _expressValidator.body)('perro').notEmpty().exists().isArray().run(req);
        case 23:
          errors = (0, _expressValidator.validationResult)(req);
          if (errors.isEmpty()) {
            _context4.next = 27;
            break;
          }
          (0, _message["default"])("Error en las validaciones", "danger");
          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 27:
          // Declarar datos del usuario
          paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
              "_latitude": req.body.paseoLatitude,
              "_longitude": req.body.paseoLongitude
            },
            "estado": req.body.estadoPaseo,
            "fecha": req.body.fechaPaseo,
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
          _context4.next = 31;
          return paseoRef.doc(req.params.id).update(paseo);
        case 31:
          result = _context4.sent;
          res.json(result);
          (0, _message["default"])("SI SE PUDO", "success");
          _context4.next = 40;
          break;
        case 36:
          _context4.prev = 36;
          _context4.t0 = _context4["catch"](0);
          (0, _message["default"])(_context4.t0.message, "danger");
          res.status(500);
        case 40:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 36]]);
  }));
  return function updatePaseo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// D
//Borrar o cancelar un paseo
exports.updatePaseo = updatePaseo;
var deletePaseo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var paseo, paseoRef, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // Datos del usuario
          paseo = {
            "id": req.params.id
          }; // Declarar la colección
          paseoRef = db.collection('paseo'); // Declarar documento y borrarlo
          _context5.next = 5;
          return paseoRef.doc(paseo.id)["delete"]();
        case 5:
          result = _context5.sent;
          res.json(result);
          (0, _message["default"])("Se borro el paseo", "success");
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
  return function deletePaseo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deletePaseo = deletePaseo;
var _default = postPaseo;
exports["default"] = _default;