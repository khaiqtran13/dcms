import { Router } from "express";

const apiRouter = Router();

// basic
apiRouter.get("/", (req, res) => res.send(req));
apiRouter.get("/user");
