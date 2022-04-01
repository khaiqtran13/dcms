const express = require("express");
const client = require("./connection");
const app = express();

// constants
const port = 8000;
const database =
    "postgres://tsvxqwcbioynvl:bebb014e18df1bd9c0f6bd949264f9c0e3b0a978aa3849c3028fee5ab8fa2279@ec2-3-229-252-6.compute-1.amazonaws.com:5432/dabna7dvuqs2bq";

app.listen(8000, () => {
    console.log("Server is now listening on port 8000");
});

client.connect();

app.get("/user", (req, res) => {
    client.query("SELECT * FROM public.user", (err, results) => {
        if (!err) {
            res.send(results.rows);
        } else {
            res.send(err);
        }
    });
    client.end;
});
