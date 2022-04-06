import express from "express";
import { getUserById, getUsers } from "../endpoints/users";

const apiRouter = express.Router();

/* 
URL is first argument
this is all nested under /api
you can add multiple functions 
ex: apiRouter.post("/password/sendcode", isLoggedOut, requestPasswordResetCode);
*/

// user
apiRouter.get("/", (req: any, res: any) => res.send(req));
apiRouter.get("/user", getUsers);
apiRouter.get("/user/:user_id", getUserById);

export default apiRouter;
