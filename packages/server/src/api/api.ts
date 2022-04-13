import express from "express";
import {
  addPatient,
  editPatient,
  setAppointment,
  getAppointmentByPatientId,
  getAppointments,
  getDentists,
  getLogin,
  getPatientRecordById,
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
apiRouter.get("/records/:user_id", getPatientRecordById);

//appointments
apiRouter.get("/appointments", getAppointments);
apiRouter.post("/appointments/set/:user_id", setAppointment);
apiRouter.get("/appointments/:user_id", getAppointmentByPatientId);

export default apiRouter;
