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

/***/ "./src/db/queries.ts":
/*!***************************!*\
  !*** ./src/db/queries.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.resetGame = exports.getAllPromptsAndDrawings = exports.decrementPlayersLeft = exports.incrementTurn = exports.incrementScore = exports.getNextPlayer = exports.addDrawing = exports.addPrompt = exports.getNumberOfPlayers = exports.getUniqueIdFromOrder = exports.getOrderById = exports.startGameQuery = exports.joinGame = void 0;\nvar _a = __webpack_require__(/*! pg */ \"pg\"), Client = _a.Client, Pool = _a.Pool;\nvar pool = new Pool({\n    host: process.env.HOSTNAME,\n    user: process.env.USERNAME,\n    port: 5432,\n    database: process.env.DB_NAME,\n    max: 100\n});\nexports.joinGame = function (gameHash, name) {\n    console.log('env', process.env.USERNAME);\n    var updateGame = 'insert into games (hash, how_many_players, players_left) values ($1, 1, 1) on conflict (hash) do update set how_many_players = (select how_many_players from games where hash = $1) + 1, players_left = (select players_left from games where hash = $1) + 1 returning how_many_players;';\n    var insertPlayerQuery = 'insert into players (name, player_order, game_id) values ($1,$2,$3) returning id';\n    return new Promise(function (resolve, reject) {\n        pool.query(updateGame, [gameHash], function (err, order) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            var playerOrder = order.rows[0]['how_many_players'];\n            console.log('order', playerOrder);\n            pool.query(insertPlayerQuery, [name, playerOrder, gameHash], function (err, insertPlayerResult) {\n                if (err) {\n                    reject(err);\n                    return;\n                }\n                var playerUniqueId = insertPlayerResult.rows[0]['id'];\n                console.log(\"inserted player \" + playerUniqueId);\n                resolve({\n                    playerOrder: playerOrder,\n                    playerUniqueId: playerUniqueId,\n                });\n            });\n        });\n    });\n};\nexports.startGameQuery = function (hash) {\n    var query = 'select how_many_players from games where hash = $1';\n    return new Promise(function (resolve, reject) {\n        pool.query(query, [hash], function (err, result) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            resolve(result.rows[0]['how_many_players']);\n        });\n    });\n};\nexports.getOrderById = function (playerId) {\n    var query = 'select player_order from players where id = $1';\n    return new Promise(function (resolve, reject) {\n        pool.query(query, [playerId], function (err, results) {\n            if (err) {\n                console.log('error storing drawing');\n                reject(err);\n                return;\n            }\n            resolve(results.rows[0].player_order);\n        });\n    });\n};\nexports.getUniqueIdFromOrder = function (playerOrder, gameId) {\n    var query = 'select id from players where player_order = $1 and game_id = $2';\n    return new Promise(function (resolve, reject) {\n        pool.query(query, [playerOrder, gameId], function (err, result) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            console.log('rows', result.rows);\n            resolve(result.rows[0].id);\n        });\n    });\n};\nexports.getNumberOfPlayers = function (gameHash) {\n    var query = 'select how_many_players from games where hash = $1';\n    return new Promise(function (resolve, reject) {\n        pool.query(query, [gameHash], function (err, result) {\n            if (err) {\n                console.log('error sending drawing to next player');\n                reject(err);\n                return;\n            }\n            resolve(result.rows[0].how_many_players);\n        });\n    });\n};\nexports.addPrompt = function (prompt, order, gameHash, playerId) {\n    var updatePrompts = 'insert into drawings_and_prompts (game_id, starting_player_order, player_id, responses) values ($1,$2,$3,$4) on conflict (player_id) do update set responses = array_append((select responses from drawings_and_prompts where starting_player_order = $2 and game_id = $1) , $5) where drawings_and_prompts.starting_player_order = $2 and drawings_and_prompts.game_id = $1';\n    return new Promise(function (resolve, reject) {\n        pool.query(updatePrompts, [gameHash, order, playerId, \"{\" + prompt + \"}\", prompt], function (err, response) {\n            if (err) {\n                console.log('error storing drawing');\n                reject(err);\n                return;\n            }\n            resolve();\n        });\n    });\n};\nexports.addDrawing = function (drawing, order, gameHash, playerId) {\n    var updateDrawings = 'insert into drawings_and_prompts (game_id, starting_player_order, player_id, responses) values ($1,$2,$3,$4) on conflict (player_id) do update set responses = array_append((select responses from drawings_and_prompts where starting_player_order = $2 and game_id = $1) , $5) where drawings_and_prompts.starting_player_order = $2 and drawings_and_prompts.game_id = $1';\n    return new Promise(function (resolve, reject) {\n        pool.query(updateDrawings, [gameHash, order, playerId, \"{\" + drawing + \"}\", drawing], function (err) {\n            if (err) {\n                console.log('error storing drawing');\n                reject(err);\n                return;\n            }\n            resolve();\n        });\n    });\n};\nexports.getNextPlayer = function (playerId) {\n    var query = 'select player_order from players where id = $1';\n    return new Promise(function (resolve, reject) {\n        pool.query(query, [playerId], function (err, results) {\n            if (err) {\n                console.log('error storing drawing');\n                reject(err);\n                return;\n            }\n            resolve(results.rows[0].player_order);\n        });\n    });\n};\nexports.incrementScore = function (playerId) {\n    var update = 'update players set score = (select score from players where id =$1) + 1';\n    return new Promise(function (resolve, reject) {\n        pool.query(update, [playerId], function (err) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            resolve();\n        });\n    });\n};\nexports.incrementTurn = function (playerId, gameHash) {\n    var playersQuery = 'select how_many_players from games where hash = $1';\n    var turnsQuery = 'select turn_number from players where id = $1';\n    var updateTurn = 'update players set turn_number = $1 where id = $2';\n    return new Promise(function (resolve, reject) {\n        pool.query(playersQuery, [gameHash], function (err, result) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            var players = result.rows[0].how_many_players;\n            console.log(players);\n            pool.query(turnsQuery, [playerId], function (err, result) {\n                if (err) {\n                    reject(err);\n                    return;\n                }\n                //if last turn has been completed, set turn to -1. Otherwise, increment it\n                var turn = result.rows[0].turn_number + 1;\n                console.log(turn);\n                pool.query(updateTurn, [turn, playerId], function (err, result) {\n                    if (err) {\n                        reject(err);\n                        return;\n                    }\n                    resolve(turn);\n                });\n            });\n        });\n    });\n};\nexports.decrementPlayersLeft = function (gameHash) {\n    var update = 'update games set players_left = (select players_left from games where hash = $1) - 1 where hash = $1 returning players_left';\n    return new Promise(function (resolve, reject) {\n        pool.query(update, [gameHash], function (err, result) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            resolve(result.rows[0].players_left);\n        });\n    });\n};\nexports.getAllPromptsAndDrawings = function (gameHash) {\n    var query = 'select responses from drawings_and_prompts where game_id = $1 order by starting_player_order asc';\n    return new Promise(function (resolve, reject) {\n        pool.query(query, [gameHash], function (err, result) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            resolve(result.rows);\n        });\n    });\n};\nexports.resetGame = function (gameHash) {\n    var gameQuery = 'update games set players_left = 0 where hash = $1';\n    var playerQuery = 'update players set players_left = 0 where game_id = $1';\n    var responseQuery = 'update drawings_and_prompts set responses = \"{}\" where game_id = $1';\n    return new Promise(function (resolve, reject) {\n        pool.query(gameQuery, [gameHash], function (err, result) {\n            if (err) {\n                reject(err);\n                return;\n            }\n            pool.query(playerQuery, [gameHash], function (err, result) {\n                if (err) {\n                    reject(err);\n                    return;\n                }\n                pool.query(responseQuery, [gameHash], function (err, result) {\n                    if (err) {\n                        reject(err);\n                        return;\n                    }\n                    resolve();\n                });\n            });\n        });\n    });\n};\n// players_left\n//turn_number \n//responses\n\n\n//# sourceURL=webpack:///./src/db/queries.ts?");

/***/ }),

/***/ "./src/server/randomPrompts.ts":
/*!*************************************!*\
  !*** ./src/server/randomPrompts.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getRandomPrompts = void 0;\nexports.getRandomPrompts = function (numberOfPlayers) {\n    //graphql appears not to support nested arrays\n    var randomPrompts = [];\n    for (var i = 0; i < numberOfPlayers; i++) {\n        var randomIndex = Math.floor(Math.random() * prompts.length - 1);\n        randomPrompts = randomPrompts.concat(prompts.slice(randomIndex, randomIndex + 6));\n    }\n    return randomPrompts;\n};\nvar prompts = [\"surfing llama\", \"a fish swimming into another fish\", \"a shark eating a cake\", \"a crab at a birthday party\", \"a seahorse in a blizzard\", \"a dinosaur crying\", \"a person with arms for legs\", \"a pig on a treadmill\", \"a horse throwing a horseshoe\", \"a walrus in a beach chair\", \"a shark waterskiing\", \"a koala sitting on a trash can\", \"a lizard putting on lipstick\", \"a squirrel roasting a marshmellow\", \"an octopus with spoons for legs\", \"a mouse riding a motorcycle\", \"a flamingo dancing\", \"a butterfly eating a steak\", \"a cat playing basktball\", \"a chicken skydiving\", \"a poptart lifting weghts\", \"french fries on a rollercoaster\", \"a strawberry astronaut\", \"a food eating another food\", \"a walking taco\", \"asparagus snowboarding\", \"a pirate in a hammock\", \"a cowboy riding a polar bear\", \"yourself with a beard\"];\n\n\n//# sourceURL=webpack:///./src/server/randomPrompts.ts?");

/***/ }),

/***/ "./src/server/resolvers/map.ts":
/*!*************************************!*\
  !*** ./src/server/resolvers/map.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.resolvers = void 0;\nvar subscription_1 = __webpack_require__(/*! ./subscription */ \"./src/server/resolvers/subscription.ts\");\nvar mutation_1 = __webpack_require__(/*! ./mutation */ \"./src/server/resolvers/mutation.ts\");\nvar query_1 = __webpack_require__(/*! ./query */ \"./src/server/resolvers/query.ts\");\nexports.resolvers = {\n    Subscription: {\n        playGame: {\n            subscribe: subscription_1.gamePlaySubscription,\n        },\n        nextTurn: {\n            subscribe: subscription_1.nextTurnSubscription,\n        }\n    },\n    Query: {\n        randomId: query_1.randomId,\n        nextPlayer: query_1.nextPlayer,\n    },\n    Mutation: {\n        joinGame: mutation_1.joinGame,\n        startGame: mutation_1.startGame,\n        drawing: mutation_1.submitDrawing,\n        prompt: mutation_1.submitCaption,\n        resetGame: mutation_1.resetGame,\n    }\n};\n\n\n//# sourceURL=webpack:///./src/server/resolvers/map.ts?");

/***/ }),

/***/ "./src/server/resolvers/mutation.ts":
/*!******************************************!*\
  !*** ./src/server/resolvers/mutation.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.resetGame = exports.submitCaption = exports.submitDrawing = exports.startGame = exports.joinGame = void 0;\nvar queries_1 = __webpack_require__(/*! ../../db/queries */ \"./src/db/queries.ts\");\n// import { pubSub } from './pubSub'\nvar publish_1 = __webpack_require__(/*! ./publish */ \"./src/server/resolvers/publish.ts\");\n// import { getRandomPrompts } from '../randomPrompts'\nexports.joinGame = function (_, _a) {\n    var name = _a.name, gameHash = _a.gameHash;\n    return __awaiter(void 0, void 0, void 0, function () {\n        var playerInfo, err_1;\n        return __generator(this, function (_b) {\n            switch (_b.label) {\n                case 0:\n                    _b.trys.push([0, 2, , 3]);\n                    return [4 /*yield*/, queries_1.joinGame(gameHash, name)];\n                case 1:\n                    playerInfo = _b.sent();\n                    return [2 /*return*/, playerInfo];\n                case 2:\n                    err_1 = _b.sent();\n                    console.log('joinGame query error', err_1);\n                    return [3 /*break*/, 3];\n                case 3: return [2 /*return*/];\n            }\n        });\n    });\n};\nexports.startGame = function (_, _a) {\n    var gameHash = _a.gameHash;\n    return __awaiter(void 0, void 0, void 0, function () {\n        var numberOfPlayers, err_2;\n        return __generator(this, function (_b) {\n            switch (_b.label) {\n                case 0:\n                    _b.trys.push([0, 3, , 4]);\n                    return [4 /*yield*/, queries_1.startGameQuery(gameHash)];\n                case 1:\n                    numberOfPlayers = _b.sent();\n                    return [4 /*yield*/, publish_1.publishGameStart(gameHash, numberOfPlayers)];\n                case 2:\n                    _b.sent();\n                    return [2 /*return*/, true];\n                case 3:\n                    err_2 = _b.sent();\n                    console.log('startGame query error', err_2);\n                    return [3 /*break*/, 4];\n                case 4: return [2 /*return*/];\n            }\n        });\n    });\n};\nexports.submitDrawing = function (_, _a) {\n    var drawing = _a.drawing, nextPlayer = _a.nextPlayer, playerId = _a.playerId, gameHash = _a.gameHash;\n    return __awaiter(void 0, void 0, void 0, function () {\n        var turn, order, players, originOrder, originPlayer, playersLeft, _b, err_3;\n        return __generator(this, function (_c) {\n            switch (_c.label) {\n                case 0:\n                    _c.trys.push([0, 12, , 13]);\n                    return [4 /*yield*/, queries_1.incrementTurn(playerId, gameHash)];\n                case 1:\n                    turn = _c.sent();\n                    return [4 /*yield*/, queries_1.getOrderById(playerId)];\n                case 2:\n                    order = _c.sent();\n                    return [4 /*yield*/, queries_1.getNumberOfPlayers(gameHash)];\n                case 3:\n                    players = _c.sent();\n                    originOrder = ((order + (turn - 1)) % players) === 0 ? players : ((order + (turn - 1)) % players);\n                    console.log(\"originOrder\", originOrder, \"turn\", turn, \"order\", order, \"players\", players);\n                    return [4 /*yield*/, queries_1.getUniqueIdFromOrder(originOrder, gameHash)];\n                case 4:\n                    originPlayer = _c.sent();\n                    turn = turn > players ? -1 : turn;\n                    return [4 /*yield*/, queries_1.addDrawing(drawing, originOrder, gameHash, originPlayer)];\n                case 5:\n                    _c.sent();\n                    if (!(turn === -1)) return [3 /*break*/, 9];\n                    return [4 /*yield*/, queries_1.decrementPlayersLeft(gameHash)];\n                case 6:\n                    playersLeft = _c.sent();\n                    _b = playersLeft === 0;\n                    if (!_b) return [3 /*break*/, 8];\n                    return [4 /*yield*/, publish_1.publishGameEnd(gameHash)];\n                case 7:\n                    _b = (_c.sent());\n                    _c.label = 8;\n                case 8:\n                    _b;\n                    return [2 /*return*/, ({ turn: turn })];\n                case 9: return [4 /*yield*/, publish_1.publishNextTurn({ drawing: drawing, turn: turn, nextPlayer: nextPlayer })];\n                case 10:\n                    _c.sent();\n                    return [2 /*return*/, ({ turn: turn })];\n                case 11: return [3 /*break*/, 13];\n                case 12:\n                    err_3 = _c.sent();\n                    console.log('addDrawing query error', err_3);\n                    return [3 /*break*/, 13];\n                case 13: return [2 /*return*/];\n            }\n        });\n    });\n};\nexports.submitCaption = function (_, _a) {\n    var prompt = _a.prompt, nextPlayer = _a.nextPlayer, playerId = _a.playerId, gameHash = _a.gameHash;\n    return __awaiter(void 0, void 0, void 0, function () {\n        var turn, order, players, originOrder, originPlayer, playersLeft, _b, err_4;\n        return __generator(this, function (_c) {\n            switch (_c.label) {\n                case 0:\n                    _c.trys.push([0, 12, , 13]);\n                    console.log('submit prompt', prompt);\n                    return [4 /*yield*/, queries_1.incrementTurn(playerId, gameHash)];\n                case 1:\n                    turn = _c.sent();\n                    return [4 /*yield*/, queries_1.getOrderById(playerId)];\n                case 2:\n                    order = _c.sent();\n                    return [4 /*yield*/, queries_1.getNumberOfPlayers(gameHash)];\n                case 3:\n                    players = _c.sent();\n                    originOrder = ((order + (turn - 1)) % players) === 0 ? players : ((order + (turn - 1)) % players);\n                    console.log(\"originOrder\", originOrder, \"turn\", turn, \"order\", order, \"players\", players);\n                    return [4 /*yield*/, queries_1.getUniqueIdFromOrder(originOrder, gameHash)];\n                case 4:\n                    originPlayer = _c.sent();\n                    turn = turn > players ? -1 : turn;\n                    return [4 /*yield*/, queries_1.addPrompt(prompt, originOrder, gameHash, originPlayer)];\n                case 5:\n                    _c.sent();\n                    if (!(turn === -1)) return [3 /*break*/, 9];\n                    return [4 /*yield*/, queries_1.decrementPlayersLeft(gameHash)];\n                case 6:\n                    playersLeft = _c.sent();\n                    _b = playersLeft === 0;\n                    if (!_b) return [3 /*break*/, 8];\n                    return [4 /*yield*/, publish_1.publishGameEnd(gameHash)];\n                case 7:\n                    _b = (_c.sent());\n                    _c.label = 8;\n                case 8:\n                    _b;\n                    return [2 /*return*/, ({ turn: turn })];\n                case 9: return [4 /*yield*/, publish_1.publishNextTurn({ prompt: prompt, turn: turn, nextPlayer: nextPlayer })];\n                case 10:\n                    _c.sent();\n                    return [2 /*return*/, ({ turn: turn })];\n                case 11: return [3 /*break*/, 13];\n                case 12:\n                    err_4 = _c.sent();\n                    console.log('addCaption query error', err_4);\n                    return [3 /*break*/, 13];\n                case 13: return [2 /*return*/];\n            }\n        });\n    });\n};\nexports.resetGame = function (_, _a) {\n    var id = _a.id;\n    return __awaiter(void 0, void 0, void 0, function () {\n        return __generator(this, function (_b) {\n            switch (_b.label) {\n                case 0: return [4 /*yield*/, queries_1.resetGame(id)];\n                case 1:\n                    _b.sent();\n                    return [2 /*return*/, null];\n            }\n        });\n    });\n};\n\n\n//# sourceURL=webpack:///./src/server/resolvers/mutation.ts?");

/***/ }),

/***/ "./src/server/resolvers/pubSub.ts":
/*!****************************************!*\
  !*** ./src/server/resolvers/pubSub.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.pubSub = void 0;\nvar graphql_subscriptions_1 = __webpack_require__(/*! graphql-subscriptions */ \"graphql-subscriptions\");\nexports.pubSub = new graphql_subscriptions_1.PubSub();\n\n\n//# sourceURL=webpack:///./src/server/resolvers/pubSub.ts?");

/***/ }),

/***/ "./src/server/resolvers/publish.ts":
/*!*****************************************!*\
  !*** ./src/server/resolvers/publish.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.publishNextTurn = exports.publishGameEnd = exports.publishGameStart = void 0;\nvar pubSub_1 = __webpack_require__(/*! ./pubSub */ \"./src/server/resolvers/pubSub.ts\");\nvar queries_1 = __webpack_require__(/*! ../../db/queries */ \"./src/db/queries.ts\");\nvar randomPrompts_1 = __webpack_require__(/*! ../randomPrompts */ \"./src/server/randomPrompts.ts\");\nexports.publishGameStart = function (gameHash, numberOfPlayers) { return __awaiter(void 0, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, pubSub_1.pubSub.publish(\"GAME_STARTED\", {\n                    playGame: {\n                        prompts: randomPrompts_1.getRandomPrompts(numberOfPlayers),\n                        gameStatus: 'STARTED',\n                    },\n                    id: gameHash\n                })];\n            case 1:\n                _a.sent();\n                return [2 /*return*/];\n        }\n    });\n}); };\nexports.publishGameEnd = function (gameHash) { return __awaiter(void 0, void 0, void 0, function () {\n    var promptsAndDrawings, recurse;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, queries_1.getAllPromptsAndDrawings(gameHash)];\n            case 1:\n                promptsAndDrawings = _a.sent();\n                recurse = function (i) {\n                    var finalAnswers = [];\n                    var array = promptsAndDrawings[i].responses;\n                    for (var j = 0; j < array.length; j += 2) {\n                        finalAnswers.push({\n                            prompt: array[j],\n                            drawing: array[j + 1] || null,\n                        });\n                    }\n                    pubSub_1.pubSub.publish(\"GAME_STARTED\", {\n                        playGame: {\n                            finalAnswers: finalAnswers,\n                            gameStatus: 'ENDGAME',\n                        },\n                        id: gameHash\n                    });\n                    if (i < promptsAndDrawings.length - 1) {\n                        setTimeout(function (i) { recurse(i); }, 5000, i + 1);\n                        return;\n                    }\n                    setTimeout(function () {\n                        pubSub_1.pubSub.publish(\"GAME_STARTED\", {\n                            playGame: {\n                                gameStatus: 'FINISHED',\n                            },\n                            id: gameHash\n                        });\n                    }, 5000);\n                };\n                recurse(0);\n                return [2 /*return*/];\n        }\n    });\n}); };\nexports.publishNextTurn = function (_a) {\n    var drawing = _a.drawing, prompt = _a.prompt, turn = _a.turn, nextPlayer = _a.nextPlayer;\n    return __awaiter(void 0, void 0, void 0, function () {\n        return __generator(this, function (_b) {\n            switch (_b.label) {\n                case 0: return [4 /*yield*/, pubSub_1.pubSub.publish('NEXT_TURN', {\n                        nextTurn: {\n                            drawing: drawing,\n                            prompt: prompt,\n                            turn: turn,\n                        },\n                        playerId: nextPlayer,\n                    })];\n                case 1:\n                    _b.sent();\n                    return [2 /*return*/];\n            }\n        });\n    });\n};\n\n\n//# sourceURL=webpack:///./src/server/resolvers/publish.ts?");

/***/ }),

/***/ "./src/server/resolvers/query.ts":
/*!***************************************!*\
  !*** ./src/server/resolvers/query.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.nextPlayer = exports.randomId = void 0;\nvar queries_1 = __webpack_require__(/*! ../../db/queries */ \"./src/db/queries.ts\");\nvar crypto_1 = __webpack_require__(/*! crypto */ \"crypto\");\nexports.randomId = function () {\n    return crypto_1.randomBytes(4).toString('hex');\n};\nexports.nextPlayer = function (_, _a) {\n    var playerOrder = _a.playerOrder, gameId = _a.gameId;\n    return __awaiter(void 0, void 0, void 0, function () {\n        var numberOfPlayers, next, playerId, err_1;\n        return __generator(this, function (_b) {\n            switch (_b.label) {\n                case 0:\n                    _b.trys.push([0, 3, , 4]);\n                    return [4 /*yield*/, queries_1.getNumberOfPlayers(gameId)];\n                case 1:\n                    numberOfPlayers = _b.sent();\n                    next = playerOrder % numberOfPlayers + 1;\n                    console.log(next);\n                    return [4 /*yield*/, queries_1.getUniqueIdFromOrder(next, gameId)];\n                case 2:\n                    playerId = _b.sent();\n                    return [2 /*return*/, playerId];\n                case 3:\n                    err_1 = _b.sent();\n                    console.log('next player query error', err_1);\n                    return [3 /*break*/, 4];\n                case 4: return [2 /*return*/];\n            }\n        });\n    });\n};\n\n\n//# sourceURL=webpack:///./src/server/resolvers/query.ts?");

/***/ }),

/***/ "./src/server/resolvers/subscription.ts":
/*!**********************************************!*\
  !*** ./src/server/resolvers/subscription.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// import { PubSub } from 'graphql-subscriptions';\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.nextTurnSubscription = exports.gamePlaySubscription = void 0;\n// const pubsub = new PubSub();\nvar pubSub_1 = __webpack_require__(/*! ./pubSub */ \"./src/server/resolvers/pubSub.ts\");\nvar graphql_subscriptions_1 = __webpack_require__(/*! graphql-subscriptions */ \"graphql-subscriptions\");\nexports.gamePlaySubscription = graphql_subscriptions_1.withFilter(function () { return pubSub_1.pubSub.asyncIterator('GAME_STARTED'); }, function (payload, variables) {\n    console.log(\"subscription called\");\n    return payload.id === variables.id;\n});\nexports.nextTurnSubscription = graphql_subscriptions_1.withFilter(function () { return pubSub_1.pubSub.asyncIterator('NEXT_TURN'); }, function (payload, variables) {\n    console.log(\"next turn listening\");\n    return payload.playerId === variables.playerId;\n});\n\n\n//# sourceURL=webpack:///./src/server/resolvers/subscription.ts?");

/***/ }),

/***/ "./src/server/schema.ts":
/*!******************************!*\
  !*** ./src/server/schema.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\n    return cooked;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.typeDefs = void 0;\nvar apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\nexports.typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n\\ntype NewPlayerInfo {\\n  playerOrder: Int\\n  playerUniqueId: Int\\n}\\n\\ntype NextTurn {\\n  drawing: String\\n  prompt: String\\n  turn: Int\\n}\\n\\ntype FinalAnswers {\\n  drawing: String\\n  prompt: String\\n}\\n\\ntype PlayGame {\\n  finalAnswers: [FinalAnswers]\\n  prompts: [String]\\n  id: String\\n  gameStatus: String\\n}\\n\\ntype Turn {\\n  turn: Int\\n}\\n\\ntype Query {\\n  randomId: String\\n  nextPlayer(playerOrder: Int, gameId: String): Int\\n}\\n\\ntype Mutation {\\n  joinGame (gameHash: String, name: String): NewPlayerInfo\\n  startGame (gameHash: String): Boolean\\n  drawing (drawing: String, nextPlayer: Int, playerId: Int, gameHash: String): Turn\\n  prompt (prompt: String, nextPlayer: Int, playerId: Int, gameHash: String): Turn\\n  endGame: [String]\\n  resetGame (id: String): Boolean\\n}\\n\\ntype Subscription {\\n  playGame(id: String): PlayGame\\n  nextTurn(playerId: Int): NextTurn\\n}\\n\"], [\"\\n\\ntype NewPlayerInfo {\\n  playerOrder: Int\\n  playerUniqueId: Int\\n}\\n\\ntype NextTurn {\\n  drawing: String\\n  prompt: String\\n  turn: Int\\n}\\n\\ntype FinalAnswers {\\n  drawing: String\\n  prompt: String\\n}\\n\\ntype PlayGame {\\n  finalAnswers: [FinalAnswers]\\n  prompts: [String]\\n  id: String\\n  gameStatus: String\\n}\\n\\ntype Turn {\\n  turn: Int\\n}\\n\\ntype Query {\\n  randomId: String\\n  nextPlayer(playerOrder: Int, gameId: String): Int\\n}\\n\\ntype Mutation {\\n  joinGame (gameHash: String, name: String): NewPlayerInfo\\n  startGame (gameHash: String): Boolean\\n  drawing (drawing: String, nextPlayer: Int, playerId: Int, gameHash: String): Turn\\n  prompt (prompt: String, nextPlayer: Int, playerId: Int, gameHash: String): Turn\\n  endGame: [String]\\n  resetGame (id: String): Boolean\\n}\\n\\ntype Subscription {\\n  playGame(id: String): PlayGame\\n  nextTurn(playerId: Int): NextTurn\\n}\\n\"])));\nvar templateObject_1;\n\n\n//# sourceURL=webpack:///./src/server/schema.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar http_1 = __webpack_require__(/*! http */ \"http\");\nvar apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\nvar map_1 = __webpack_require__(/*! ./resolvers/map */ \"./src/server/resolvers/map.ts\");\nvar schema_1 = __webpack_require__(/*! ./schema */ \"./src/server/schema.ts\");\nvar app = express();\napp.use(express.static('public'));\nvar server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: map_1.resolvers });\nserver.applyMiddleware({ app: app });\nvar httpServer = http_1.createServer(app);\nserver.installSubscriptionHandlers(httpServer);\nhttpServer.listen(3000, function () {\n    console.log(\"Listening!\");\n});\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-express\");\n\n//# sourceURL=webpack:///external_%22apollo-server-express%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

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

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg\");\n\n//# sourceURL=webpack:///external_%22pg%22?");

/***/ })

/******/ });