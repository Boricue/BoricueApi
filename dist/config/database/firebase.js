"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _app = require("firebase-admin/app");
var _firebaseAdmin = require("firebase-admin");
var _creds = _interopRequireDefault(require("./creds.json"));
//Funciones de Firebase: App y Firestore

var _require = require('firebase-admin/firestore'),
  getFirestore = _require.getFirestore,
  Timestamp = _require.Timestamp,
  FieldValue = _require.FieldValue;
var admin = require('firebase-admin');

// Configuración de Firebase con variables de entorno
var firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  //databaseURL: DATABASEURL,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  //measurementId: MEASUREMENTID,
  credential: _firebaseAdmin.credential.cert(_creds["default"])
};

// Iniciar servicios de Firebase
var initFirebase = (0, _app.initializeApp)(firebaseConfig);
var db = getFirestore();

// Exportar las funciones de Firebase
module.exports = db;
var _default = {
  initFirebase: initFirebase
};
exports["default"] = _default;