import express from "express";
import {
  addPatient,
  editPatient,
  getAppointments,
  getDentists,
  getLogin,
  getPatients,
  getRecords,
  getUserById,
  getUsers,
  setAppointment,
} from "../endpoints/endpoints";

const apiRouter = express.Router();

/* 
URL is first argument
this is all nested under /api
you can add multiple functions 
ex: apiRouter.post("/password/sendcode", isLoggedOut, requestPasswordResetCode);
*/

apiRouter.get("/", (req: any, res: any) => res.send(req));

// user
apiRouter.get("/user", getUsers);
apiRouter.get("/user/dentists", getDentists);
apiRouter.post("/user/add", addPatient);
apiRouter.post("/user/edit/:user_id", editPatient);
apiRouter.get("/user/:user_id", getUserById);

// login
apiRouter.post("/login", getLogin);

//patients
apiRouter.get("/patients", getPatients);

//records
apiRouter.get("/records", getRecords);

//appoiontments
apiRouter.get("/appointments", getAppointments);
apiRouter.post("/appointments/set/:user_id", setAppointment);

export default apiRouter;
