const { Client } = require("pg");

const client = new Client({
    connectionString: 'postgres://tsvxqwcbioynvl:bebb014e18df1bd9c0f6bd949264f9c0e3b0a978aa3849c3028fee5ab8fa2279@ec2-3-229-252-6.compute-1.amazonaws.com:5432/dabna7dvuqs2bq',
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = client;
