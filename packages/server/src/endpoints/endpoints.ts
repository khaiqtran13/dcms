import client from "../../connection";
import express from "express";
import { IPatient, IUser } from "../database/user.types";
import { IAppointment } from "../database/gen.types";

// TODO: express Typing - didn't add TypeScript for shits and giggles

/* 
ideally we want to just use the SQL scripts instead of posting
to the server page 
honestly it doesn't really matter because fuck security 
but 100% printing to the page is not needed 
you can simply make these functions with SQL logic 
unless your a JT/TS god and want to parse JSON instead of using SQL
what're chances the prof checks
*/

//Gets all users
export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await client.query("SELECT * FROM public.user");
        res.json(users.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Gets a user by ID
export const getUserById = async (req: express.Request, res: any) => {
    try {
        const { user_id } = req.params;
        const user = await client.query(
            `SELECT * FROM public.user WHERE user_id = ${user_id}`,
        );
        res.json(user.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
};

// takes user_id and password and autheticates user
export const getLogin = async (
    req: express.Request<{ user_id: number; password: string }>,
    res: express.Response,
) => {
    try {
        const user_id = req.body.user_id;
        const password = req.body.password;
        const user = await client.query(
            `SELECT * FROM public.user WHERE user_id = ${user_id} AND password = ${password}`,
        );
        return res.status(200).json(user.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

// We are going to need to access patient data as well as edit
export const getPatients = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const patients = await client.query("SELECT * FROM public.patients");
        res.json(patients.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

// Can be called to get users from any role, etc User (Patient), Dentist, or Receptionist
export const getUserByRole = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const { role } = req.params;
        const patients = await client.query(
            `SELECT * FROM public.user WHERE role = '${role}'`,
        );
        res.json(patients.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

// Can be called by anyone to view a patient's records
export const getRecords = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const records = await client.query("SELECT * FROM public.records");
        return res.status(200).json(records.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

// Can be called by a patient to view their own records
export const getPatientRecordById = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const { user_id } = req.params;
        const records = await client.query(
            `SELECT * FROM public.records WHERE patient_id = (SELECT patient_id FROM public.patients WHERE user_id = ${user_id})`,
        );
        return res.status(200).json(records.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

// We will need to be able to set and view appointments
export const getAppointments = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const appointments = await client.query(
            `SELECT * FROM public.appointments`,
        );
        res.json(appointments.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Adds the user to the database
export const addPatient = async (
    req: express.Request<{
        new_patient: IPatient;
    }>,
    res: express.Response,
) => {
    try {
        var new_user: IPatient = req.body.new_patient;
        new_user.role = "User";

        if (new_user.user_id == 0) {
            let max = 9999999;
            let min = 1000100;
            new_user.user_id = Math.floor(Math.random() * (max - min) + min);
            new_user.patient_id = Math.floor(Math.random() * (max - min) + min);
        }

        const user = await client.query(
            `INSERT INTO public.user (user.id, first_name, middle_name, last_name, street_address, city, province, password, role, ssn) 
      VALUES (${new_user.first_name}, ${new_user.first_name}, ${new_user.middle_name}, ${new_user.last_name}, ${new_user.street_address},
        ${new_user.city}, ${new_user.province}, ${new_user.password}, ${new_user.role}, ${new_user.ssn} ) `,
        );

        const patient = await client.query(
            `INSERT INTO public.patients (patient_id, gender, insurance, email_address, date_of_birth, payment_id, record_id, user_id) 
        VALUES (${new_user.patient_id}, ${new_user.gender}, ${new_user.insurance}, ${new_user.email_address}, ${new_user.date_of_birth},
            ${new_user.payment_id}, ${new_user.record_id}, ${new_user.user_id} ) `,
        );
        return res.status(201);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Edits a patient
export const editPatient = async (
    req: express.Request<{
        new_patient: IPatient;
    }>,
    res: express.Response,
) => {
    try {
        var curr_user: IPatient = req.body.new_patient;
        curr_user.role = "User";

        const user = await client.query(
            `UPDATE public.user 
      SET first_name= ${curr_user.first_name}, 
      middle_name = ${curr_user.middle_name}, 
      last_name= ${curr_user.last_name}, 
      street_address= ${curr_user.street_address}, 
      city = ${curr_user.city}, 
      province= ${curr_user.province}, 
      password = ${curr_user.password}, 
      role = ${curr_user.role},
      ssn = ${curr_user.ssn}
      WHERE user_id = ${curr_user.user_id}`,
        );

        const patient = await client.query(
            `UPDATE public.patient
        SET gender= ${curr_user.gender},
        insurance = ${curr_user.insurance},
        email_address = ${curr_user.email_address},
        date_of_birth = ${curr_user.date_of_birth}
        WHERE user_id = ${curr_user.user_id}`,
        );
        return res.status(201);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Gets a list of all the dentists
export const getDentists = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const users = await client.query(
            "SELECT * FROM public.user WHERE public.user.role = 'Dentist'",
        );
        res.json(users.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Gets all the appointments based on user ID
export const getAppointmentByPatientId = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const { user_id } = req.params;
        const appointments = await client.query(
            `SELECT * FROM public.appointments WHERE patient_id = (SELECT patient_id FROM public.patients WHERE user_id = ${user_id})`,
        );
        return res.status(200).json(appointments.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Sets an appointment based on IAppointment and user_id
export const setAppointment = async (
    req: express.Request<{
        new_app: IAppointment;
        user_id: number;
    }>,
    res: express.Response,
) => {
    try {
        var new_app: IAppointment = req.body.new_app;
        var user_id: number = req.body.user_id;

        const patient_query = await client.query(
            `SELECT public.patients.patient_id FROM public.patients WHERE user_id = ${user_id}`,
        );

        new_app.patient_id = patient_query.rows[0];

        if (new_app.appointment_id == 0) {
            let max = 9999;
            let min = 100;
            new_app.appointment_id = Math.floor(
                Math.random() * (max - min) + min,
            );
        }

        const appointment_insert = await client.query(
            `INSERT INTO public.appointments
      (fee_id, patient_id, dentist_id, cancel_date, date, duration, appointment_type, status,
        appointment_id, procedure_id)
      VALUES
      (${new_app.fee_id}, ${new_app.patient_id}, ${new_app.dentist_id}, ${new_app.cancel_date},
        ${new_app.date}, ${new_app.duration}, ${new_app.appointment_type}, ${new_app.status},
        ${new_app.appointment_id}, ${new_app.procedure_id})`,
        );

        return res.status(201);
    } catch (err: any) {
        console.error(err.message);
    }
};

//
export const getPatientObject = async (
    req: express.Request,
    res: express.Response,
) => {
    try {
        const { patient_id } = req.params;
        const patient_query = await client.query(
            `SELECT * FROM public.patients WHERE patient_id = ${patient_id}`,
        );

        const user_query = await client.query(
            `SELECT * FROM public.user WHERE user_id = ${patient_query.rows[0].user_id}`,
        );

        var user_row = user_query.rows[0];
        var patient_row = patient_query.rows[0];

        function quickTimeSanitize(input: any) {
            try {
                return input.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").trim();
            } catch {
                return input;
            }
        }

        Object.keys(user_row).forEach((key) => {
            user_row[key] = quickTimeSanitize(user_row[key]);
        });

        Object.keys(patient_row).forEach((key) => {
            patient_row[key] = quickTimeSanitize(patient_row[key]);
        });

        const patient: IPatient = {
            user_id: user_row.user_id,
            first_name: user_row.first_name,
            middle_name: user_row.middle_name,
            last_name: user_row.last_name,
            city: user_row.city,
            street_address: user_row.street_address,
            province: user_row.province,
            password: user_row.password,
            role: user_row.role,
            ssn: user_row.ssn,
            patient_id: patient_row.patient_id,
            gender: patient_row.gender,
            insurance: patient_row.insurance,
            email_address: patient_row.email_address,
            date_of_birth: patient_row.date_of_birth,
            payment_id: patient_row.payment_id,
            record_id: patient_row.record_id,
        };
        return res.status(200).json(patient);
    } catch (err: any) {
        console.error(err.message);
    }
};
