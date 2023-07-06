"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.getUsers = exports.getUser = exports.deleteUser = exports["default"] = exports.createUserDb = void 0;
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
// Registrar el nuevo usuario en la base de datos
var createUserDb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _expressValidator.body)('id').notEmpty().exists().isEmail().run(req);
        case 3:
          _context.next = 5;
          return (0, _expressValidator.body)('nombre').notEmpty().exists().isString().run(req);
        case 5:
          _context.next = 7;
          return (0, _expressValidator.body)('municipio').notEmpty().exists().isString().run(req);
        case 7:
          _context.next = 9;
          return (0, _expressValidator.body)('direccion').notEmpty().exists().isString().run(req);
        case 9:
          _context.next = 11;
          return (0, _expressValidator.body)('paseoLatitude').notEmpty().exists().run(req);
        case 11:
          _context.next = 13;
          return (0, _expressValidator.body)('paseoLongitude').notEmpty().exists().run(req);
        case 13:
          _context.next = 15;
          return (0, _expressValidator.body)('telefono').notEmpty().exists().isMobilePhone().run(req);
        case 15:
          _context.next = 17;
          return (0, _expressValidator.body)('edad').notEmpty().exists().isString().run(req);
        case 17:
          _context.next = 19;
          return (0, _expressValidator.body)('pais').notEmpty().exists().isString().run(req);
        case 19:
          errors = (0, _expressValidator.validationResult)(req);
          if (errors.isEmpty()) {
            _context.next = 23;
            break;
          }
          (0, _message["default"])("Error en las validaciones", "danger");
          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 23:
          // Declarar datos del usuario
          user = {
            "id": req.body.id,
            "nombre": req.body.nombre,
            "municipio": req.body.municipio,
            "direccion": req.body.direccion,
            "ubicacion": {
              "_latitude": req.body.paseoLatitude,
              "_longitude": req.body.paseoLongitude
            },
            "telefono": req.body.telefono,
            "edad": req.body.edad,
            "pais": req.body.pais,
            "perros": [],
            "chats": []
          }; //Declarar colección
          usuariosRef = db.collection('usuario'); // Crear el documento, sus campos y llenarlos
          _context.next = 27;
          return usuariosRef.doc(user.id).set({
            nombre: user.nombre,
            municipio: user.municipio,
            direccion: user.direccion,
            ubicacion: user.ubicacion,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais,
            perros: user.perros,
            chats: user.chats
          });
        case 27:
          result = _context.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
          _context.next = 36;
          break;
        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](0);
          (0, _message["default"])(_context.t0.message, "danger");
          res.status(500);
        case 36:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 32]]);
  }));
  return function createUserDb(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// R
//Obtener todos los usuarios de la base de datos
exports.createUserDb = createUserDb;
var getUsers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          try {
            result = db.collection('usuario').get();
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
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
// Obtener un usuario en particular de la base de datos
exports.getUsers = getUsers;
var getUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$params$id, id, result, doc, data, jsonData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Declarar datos del usuario
          id = (_req$params$id = req.params.id) !== null && _req$params$id !== void 0 ? _req$params$id : "none"; // Declarar colección
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
            res.json(false);
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
  return function getUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// U
// Actualizar información del usuario
exports.getUser = getUser;
var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var errors, user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _expressValidator.body)('nombre').notEmpty().exists().isString().run(req);
        case 3:
          _context4.next = 5;
          return (0, _expressValidator.body)('municipio').notEmpty().exists().isString().run(req);
        case 5:
          _context4.next = 7;
          return (0, _expressValidator.body)('direccion').notEmpty().exists().isString().run(req);
        case 7:
          _context4.next = 9;
          return (0, _expressValidator.body)('paseoLatitude').notEmpty().exists().run(req);
        case 9:
          _context4.next = 11;
          return (0, _expressValidator.body)('paseoLongitude').notEmpty().exists().run(req);
        case 11:
          _context4.next = 13;
          return (0, _expressValidator.body)('telefono').notEmpty().exists().isMobilePhone().run(req);
        case 13:
          _context4.next = 15;
          return (0, _expressValidator.body)('edad').notEmpty().exists().isString().run(req);
        case 15:
          _context4.next = 17;
          return (0, _expressValidator.body)('pais').notEmpty().exists().isString().run(req);
        case 17:
          errors = (0, _expressValidator.validationResult)(req);
          if (errors.isEmpty()) {
            _context4.next = 21;
            break;
          }
          (0, _message["default"])("Error en las validaciones", "danger");
          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 21:
          // Declarar datos del usuario
          user = {
            "nombre": req.body.nombre,
            "municipio": req.body.municipio,
            "direccion": req.body.direccion,
            "ubicacion": {
              "_latitude": req.body.paseoLatitude,
              "_longitude": req.body.paseoLongitude
            },
            "telefono": req.body.telefono,
            "edad": req.body.edad,
            "pais": req.body.pais
          }; // Declarar collección
          usuariosRef = db.collection('usuario'); // Declarar documento y actualizar los campos con los datos del usuario
          _context4.next = 25;
          return usuariosRef.doc(user.id).update({
            nombre: user.nombre,
            municipio: user.municipio,
            direccion: user.direccion,
            ubicacion: user.ubicacion,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais
          });
        case 25:
          result = _context4.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
          _context4.next = 34;
          break;
        case 30:
          _context4.prev = 30;
          _context4.t0 = _context4["catch"](0);
          (0, _message["default"])(_context4.t0.message, "danger");
          res.status(500);
        case 34:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 30]]);
  }));
  return function updateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// D
exports.updateUser = updateUser;
var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // Datos del usuario
          user = {
            "id": req.params.id
          }; // Declarar la colección
          usuariosRef = db.collection('usuario'); // Declarar documento y borrarlo
          _context5.next = 5;
          return usuariosRef.doc(user.id)["delete"]();
        case 5:
          result = _context5.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
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
  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/*export const isValidToken = (req, res, next) => {

    // const tokenClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJMVUlTIEJFQ0VSUlJBIiwiaWQiOiIxMDQyMzc2MjAxNDg2MTQ0MTA0NDQiLCJlbWFpbCI6ImVsaW5nZW5pZXJvcHJvZmVzb3JAZ21haWwuY29tIiwiaWF0IjoxNjgwMDQzMTQ1LCJleHAiOjE2ODAwNDY3NDV9.CN8oJ3L2Gbc4-HYf9-T2-zTFEyeTMDLe0y4bLAPmGlM";
    const tokenClient = req.cookies.eib_per;
    // console.log(req.cookie);
    try {
        jwt.verify(tokenClient, process.env.SECRET_KEY, (err, decoded) => {
            if (!err) {
                // res.send("todo bien");
                next();
            } else {
                res.send({ "error": "El token es errado o ha caducado " })
            }
            // console.log(err);
        })
    } catch (error) {
        res.send({ "error": "El token es errado o ha caducado " })
    }
}*/
exports.deleteUser = deleteUser;
var _default = createUserDb;
exports["default"] = _default;