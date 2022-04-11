import express from "express";
import {
  getAppointments,
  getLogin,
  getPatients,
  getProcedureNames,
  getRecords,
  getUserById,
  getUsers,
} from "../endpoints/endpoints";

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
apiRouter.post("/login", getLogin);
apiRouter.get("/patients", getPatients);
apiRouter.get("/records", getRecords);
apiRouter.get("/appointments", getAppointments);

// appointment procedures
apiRouter.get("/procedures/names", getProcedureNames);

export default apiRouter;
