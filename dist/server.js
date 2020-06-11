/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./database/inMemory.ts":
/*!******************************!*\
  !*** ./database/inMemory.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getGame = void 0;\nvar data = {\n    3124: {\n        gameState: {\n            started: true,\n            turn: 2,\n            numOfPlayers: 3,\n        }\n    }\n};\nexports.getGame = function (id) {\n    return data[id];\n};\n\n\n//# sourceURL=webpack:///./database/inMemory.ts?");

/***/ }),

/***/ "./src/server/resolvers/map.ts":
/*!*************************************!*\
  !*** ./src/server/resolvers/map.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.resolvers = void 0;\nvar inMemory_1 = __webpack_require__(/*! ../../../database/inMemory */ \"./database/inMemory.ts\");\nvar graphql_subscriptions_1 = __webpack_require__(/*! graphql-subscriptions */ \"graphql-subscriptions\");\nvar pubsub = new graphql_subscriptions_1.PubSub();\nvar POST_ADDED = 'POST ADDED!';\nexports.resolvers = {\n    Query: {\n        game: function (_, _a) {\n            var id = _a.id;\n            return inMemory_1.getGame(id);\n        },\n    },\n    Game: {\n        gameState: function (game) {\n            return game.gameState;\n        }\n    },\n    GameState: {\n        started: function (state) {\n            return state.started;\n        },\n        turn: function (state) {\n            return state.turn;\n        },\n        numOfPlayers: function (state) {\n            return state.numOfPlayers;\n        }\n    },\n    Mutation: {\n        newGame: function () {\n            return Math.random() * 100;\n        }\n    }\n};\n\n\n//# sourceURL=webpack:///./src/server/resolvers/map.ts?");

/***/ }),

/***/ "./src/server/routes.ts":
/*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\nrouter.get('/api/hello', function (req, res, next) {\n    res.json('World');\n});\nexports.default = router;\n\n\n//# sourceURL=webpack:///./src/server/routes.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\n    return cooked;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar _a = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\"), ApolloServer = _a.ApolloServer, gql = _a.gql;\nvar resolvers = __webpack_require__(/*! ./resolvers/map */ \"./src/server/resolvers/map.ts\").resolvers;\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes.ts\");\nvar app = express();\nvar typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n\\ntype GameState {\\n  started: Boolean\\n  turn: Int\\n  numOfPlayers: Int\\n}\\ntype Game {\\n  gameState: GameState\\n}\\ntype Query {\\n  game(id: Int): Game\\n}\\ntype Mutation {\\n  newGame: Float\\n}\\n\"], [\"\\n\\ntype GameState {\\n  started: Boolean\\n  turn: Int\\n  numOfPlayers: Int\\n}\\ntype Game {\\n  gameState: GameState\\n}\\ntype Query {\\n  game(id: Int): Game\\n}\\ntype Mutation {\\n  newGame: Float\\n}\\n\"])));\napp.use(express.static('public'));\napp.use(routes_1.default);\nvar server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });\nserver.applyMiddleware({ app: app });\nvar port = process.env.PORT || 3000;\napp.listen(port, function () { return console.log(\"Server listening on port: \" + port); });\nvar templateObject_1;\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-express\");\n\n//# sourceURL=webpack:///external_%22apollo-server-express%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "graphql-subscriptions":
/*!****************************************!*\
  !*** external "graphql-subscriptions" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-subscriptions\");\n\n//# sourceURL=webpack:///external_%22graphql-subscriptions%22?");

/***/ })

/******/ });