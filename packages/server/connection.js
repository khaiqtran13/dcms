const { Client } = require("pg");

const client = new Client({
    host: "ec2-3-229-252-6.compute-1.amazonaws.com",
    user: "tsvxqwcbioynvl",
    port: 5432,
    password:
        "bebb014e18df1bd9c0f6bd949264f9c0e3b0a978aa3849c3028fee5ab8fa2279",
    database: "dabna7dvuqs2bq",
});

module.exports = client;
