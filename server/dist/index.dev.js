"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var cors_1 = __importDefault(require("cors"));

var pg_1 = require("pg");

var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
var port = 3001;
app.get('/', function (req, res) {
  res.status(200).json({
    result: 'success'
  });
});
app.listen(port, function () {
  console.log('server listen to the port $(port)');
});
app.get('/', function (req, res) {
  var pool = openDb();
  pool.query('insert into task (description) values ($1) returning *', [req.body.description], function (error, result) {
    if (error) {
      res.status(500).json({
        error: error.message
      });
    }

    res.status(200).json({
      id: result.rows[0].id
    });
  });
});

var openDb = function openDb() {
  var pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'root',
    port: 5432
  });
  return pool;
};