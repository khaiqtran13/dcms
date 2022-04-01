import express, { Application, Request, Response } from "express";

const Sequelize = require("sequelize");
const app: Application = express();
const port = 8000;

const database =
    "postgres://tsvxqwcbioynvl:bebb014e18df1bd9c0f6bd949264f9c0e3b0a978aa3849c3028fee5ab8fa2279@ec2-3-229-252-6.compute-1.amazonaws.com:5432/dabna7dvuqs2bq";

const sequelize = new Sequelize(database);

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello World!",
    });
});

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured:`);
}
