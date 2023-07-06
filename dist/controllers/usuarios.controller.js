"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.isValidToken = exports.getUsers = exports.getUser = exports.deleteUser = exports["default"] = exports.createUserDb = exports.createUserAuth = exports.addDog = void 0;
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
// Crear usuario en Firebase Auth
var createUserAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Declarar datos del usuario
          user = {
            "ilema": req.body.email,
            "password": req.body.password,
            "name": req.body.name
          }; // Crear usuario en Authentication con el metodo createUser()
          _context.next = 4;
          return admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
          });
        case 4:
          result = _context.sent;
          res.json(result);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          (0, _message["default"])(_context.t0.message, "danger");
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function createUserAuth(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
// Registrar el nuevo usuario en la base de datos
exports.createUserAuth = createUserAuth;
var createUserDb = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Declarar datos del usuario
          user = {
            "id": req.body.id,
            "nombre": req.body.nombre,
            "apellidos": req.body.apellidos,
            "calificacion_paseador": 0,
            "calificacion_dueno": 0,
            "municipio": req.body.municipio,
            "direccion": req.body.direccion,
            "telefono": req.body.telefono,
            "edad": req.body.edad,
            "pais": req.body.pais,
            "perros": [],
            "chats": []
          }; //Declarar colección
          usuariosRef = db.collection('usuario'); // Crear el documento, sus campos y llenarlos
          _context2.next = 5;
          return usuariosRef.doc(user.id).set({
            nombre: user.nombre,
            apellidos: user.apellidos,
            calificacion_paseador: user.calificacion_paseador,
            calificacion_dueno: user.calificacion_dueno,
            municipio: user.municipio,
            direccion: user.direccion,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais,
            perros: user.perros,
            chats: user.chats
          });
        case 5:
          result = _context2.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
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
  return function createUserDb(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// R
//Obtener todos los usuarios de la base de datos
exports.createUserDb = createUserDb;
var getUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
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
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
// Obtener un usuario en particular de la base de datos
exports.getUsers = getUsers;
var getUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$params$id, id, result, doc, data, jsonData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // Declarar datos del usuario
          id = (_req$params$id = req.params.id) !== null && _req$params$id !== void 0 ? _req$params$id : "none"; // Declarar colección
          result = db.collection('usuario').doc(id);
          _context4.next = 5;
          return result.get();
        case 5:
          doc = _context4.sent;
          data = doc.data();
          jsonData = JSON.stringify(data);
          if (doc.exists) {
            res.json(JSON.parse(jsonData));
          } else {
            console.log('No existe este usuario: ' + id);
            res.json("El usuario " + id + " no existe");
          }
          _context4.next = 16;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          (0, _message["default"])(_context4.t0.message, "danger");
          res.status(500);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function getUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// U
// Actualizar información del usuario
exports.getUser = getUser;
var updateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
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
          _context5.next = 5;
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
  return function updateUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//TODO: Terminar las funciones de añadir y borrar perros del usuario
// Añadir perros al usuario
exports.updateUser = updateUser;
var addDog = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          // Declarar datos del usuario
          user = {
            "id": req.body.id,
            "perros": {
              "id_perro": req.body.id_perro,
              "nombre_perro": req.body.nombre_perro
            }
          }; // Declarar collecciónes
          usuariosRef = db.collection('usuario'); // Declarar documento y actualizar los campos con los datos del usuario
          _context6.next = 5;
          return usuariosRef.doc(user.id).update({
            perros: db.FieldValue.arrayUnion(user.perros)
          });
        case 5:
          result = _context6.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          (0, _message["default"])(_context6.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function addDog(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// D
exports.addDog = addDog;
var deleteUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user, usuariosRef, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          // Datos del usuario
          user = {
            "id": req.params.id
          }; // Declarar la colección
          usuariosRef = db.collection('usuario'); // Declarar documento y borrarlo
          _context7.next = 5;
          return usuariosRef.doc(user.id)["delete"]();
        case 5:
          result = _context7.sent;
          res.json(result);
          (0, _message["default"])("Exito", "success");
          _context7.next = 14;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          (0, _message["default"])(_context7.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function deleteUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.deleteUser = deleteUser;
var isValidToken = function isValidToken(req, res, next) {
  // const tokenClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJMVUlTIEJFQ0VSUlJBIiwiaWQiOiIxMDQyMzc2MjAxNDg2MTQ0MTA0NDQiLCJlbWFpbCI6ImVsaW5nZW5pZXJvcHJvZmVzb3JAZ21haWwuY29tIiwiaWF0IjoxNjgwMDQzMTQ1LCJleHAiOjE2ODAwNDY3NDV9.CN8oJ3L2Gbc4-HYf9-T2-zTFEyeTMDLe0y4bLAPmGlM";
  var tokenClient = req.cookies.eib_per;
  // console.log(req.cookie);
  try {
    _jsonwebtoken["default"].verify(tokenClient, process.env.SECRET_KEY, function (err, decoded) {
      if (!err) {
        // res.send("todo bien");
        next();
      } else {
        res.send({
          "error": "El token es errado o ha caducado "
        });
      }
      // console.log(err);
    });
  } catch (error) {
    res.send({
      "error": "El token es errado o ha caducado "
    });
  }
};
exports.isValidToken = isValidToken;
var _default = createUserAuth;
exports["default"] = _default;