import { Router } from "express";
import { getUser } from "../middleware/authentication";

const apiRouter = Router();

// basic
apiRouter.get("/", (req, res) => res.send(req));
apiRouter.get("/user", getUser);
