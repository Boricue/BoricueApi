"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
var _index = _interopRequireDefault(require("./config/index.js"));
//import firebase from "./config/database/firebase";

_app["default"].listen(_app["default"].get("PORT"), _index["default"]);