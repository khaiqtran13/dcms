import express from "express";
import {
    getAppointmentByPatientId,
    getAppointments,
    getLogin,
    getPatientRecordById,
    getPatientRecords,
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
apiRouter.get("/", (req: any, res: any) => res.send(req));
apiRouter.get("/user", getUsers);
apiRouter.get("/user/:user_id", getUserById);
apiRouter.post("/login", getLogin);
apiRouter.get("/patients", getPatients);
apiRouter.get("/records", getRecords);

// patient
apiRouter.get("/patient_records", getPatientRecords);
apiRouter.get("/patient_records/:patient_id", getPatientRecordById)
apiRouter.get("/appointments", getAppointments);
apiRouter.get("/appointments/:patient_id", getAppointmentByPatientId);



export default apiRouter;
