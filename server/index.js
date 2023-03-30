"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3001;
app.get('/', (req, res) => {
    res.status(200).json({ result: 'success' });
});
app.listen(port, () => {
    console.log('server listen to the port $(port)');
});
app.get('/', (req, res) => {
    const pool = openDb();
    pool.query('insert into task (description) values ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
const openDb = () => {
    const pool = new pg_1.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: 'root',
        port: 5432
    });
    return pool;
};
