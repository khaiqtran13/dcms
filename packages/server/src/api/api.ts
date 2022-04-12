import express from "express";
import {
  addUser,
  getAppointments,
  getDentists,
  getLogin,
  getPatients,
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
//This is more a misc. list of API calls
apiRouter.get("/", (req: any, res: any) => res.send(req));
apiRouter.get("/user", getUsers);
apiRouter.get("/user/dentists", getDentists);
apiRouter.get("/user/:user_id", getUserById);
apiRouter.post("/login", getLogin);
apiRouter.get("/patients", getPatients);
apiRouter.get("/records", getRecords);
apiRouter.get("/appointments", getAppointments);

//receptionist
apiRouter.post("/user/add", addUser);
apiRouter.post("/user/edit/:user_id", addUser);

export default apiRouter;
