const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    database: 'basicfullstack',
    password: 'postgres',
    port: 5432,
    host: 'localhost'
}); 

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
        return;
    }
    console.log('Database connected');
    release();
});

app.use(cors());

app.get("/api/vite", (req, res) => {
    pool.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
            return;
        }
        res.json({
            success: true,
            message: "getting users data",
            data: result.rows
        });
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
