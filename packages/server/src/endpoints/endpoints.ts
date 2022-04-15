import client from "../../connection";
import express from "express";
import { IEmployee, IPatient, IUser } from "../database/user.types";
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

//Adds a patient to the DB
export const addPatient = async (
    req: express.Request<{
        new_patient: IPatient;
    }>,
    res: express.Response,
) => {
    try {
        var user: IPatient = req.body.new_patient;
        user.role = "User";

        if (user.user_id == 0) {
            let max = 9999999;
            let min = 1000100;
            user.user_id = Math.floor(Math.random() * (max - min) + min);
            user.patient_id = Math.floor(Math.random() * (max - min) + min);
        }

        const user_queryInsert = {
            text: `INSERT INTO public.user (user_id, first_name, middle_name, last_name, street_address, city, province, password, role, ssn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            values: [
                user.user_id,
                user.first_name,
                user.middle_name,
                user.last_name,
                user.street_address,
                user.city,
                user.province,
                user.password,
                user.role,
                user.ssn,
            ],
        };

        const patient_queryInsert = {
            text: `INSERT INTO public.patients (patient_id, gender, insurance, email_address, date_of_birth, payment_ids, record_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            values: [
                user.patient_id,
                user.gender,
                user.insurance,
                user.email_address,
                user.date_of_birth,
                user.payment_id,
                user.record_id,
                user.user_id,
            ],
        };

        const user_query = await client.query(
            user_queryInsert.text,
            user_queryInsert.values,
        );

        const patient_query = await client.query(
            patient_queryInsert.text,
            patient_queryInsert.values,
        );

        return res.status(201);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Edits a patient on the DB
export const editPatient = async (
    req: express.Request<{
        new_patient: IPatient;
    }>,
    res: express.Response,
) => {
    try {
        var patient: IPatient = req.body.new_patient;
        patient.role = "User";

        if (patient.middle_name == "") {
            patient.middle_name = undefined;
        }

        const user_queryInsert = {
            text: `UPDATE public.user SET first_name= $1, middle_name= $2, last_name= $3, street_address= $4, city= $5, province= $6, password= $7, role= $8, ssn= $9 WHERE user_id= $10`,
            values: [
                patient.first_name,
                patient.middle_name,
                patient.last_name,
                patient.street_address,
                patient.city,
                patient.province,
                patient.password,
                patient.role,
                patient.ssn,
                patient.user_id,
            ],
        };

        const patient_queryInsert = {
            text: `UPDATE public.patients SET gender= $1, insurance= $2, email_address= $3, date_of_birth= $4  WHERE user_id= $5`,
            values: [
                patient.gender,
                patient.insurance,
                patient.email_address,
                patient.date_of_birth,
                patient.user_id,
            ],
        };

        const user_query = await client.query(
            user_queryInsert.text,
            user_queryInsert.values,
        );

        const patient_query = await client.query(
            patient_queryInsert.text,
            patient_queryInsert.values,
        );
        return res.status(201);
    } catch (err: any) {
        console.error(err.message);
    }
};

//Adds the user to the database
export const addEmployee = async (
    req: express.Request<{
        new_employee: IEmployee;
    }>,
    res: express.Response,
) => {
    try {
        var user: IEmployee = req.body.new_employee;
        //user.role = "User";

        if (user.user_id == 0) {
            let max = 9999999;
            let min = 1000100;
            user.user_id = Math.floor(Math.random() * (max - min) + min);
            user.employee_id = Math.floor(Math.random() * (max - min) + min);
        }

        const user_queryInsert = {
            text: `INSERT INTO public.user (user_id, first_name, middle_name, last_name, street_address, city, province, password, role, ssn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            values: [
                user.user_id,
                user.first_name,
                user.middle_name,
                user.last_name,
                user.street_address,
                user.city,
                user.province,
                user.password,
                user.role,
                user.ssn,
            ],
        };

        const employee_queryInsert = {
            text: `INSERT INTO public.employee (employee_id, user_id, employee_type, salary, branch_id) VALUES ($1, $2, $3, $4, $5)`,
            values: [
                user.employee_id,
                user.user_id,
                user.employee_type,
                user.salary,
                user.branch_id,
            ],
        };

        const user_query = await client.query(
            //         `INSERT INTO public.user (user_id, first_name, middle_name, last_name, street_address, city, province, password, role, ssn)
            //   VALUES (${new_user.first_name}, ${new_user.first_name}, ${new_user.middle_name}, ${new_user.last_name}, ${new_user.street_address},
            //     ${new_user.city}, ${new_user.province}, ${new_user.password}, ${new_user.role}, ${new_user.ssn} ) `,
            user_queryInsert.text,
            user_queryInsert.values,
        );

        const employee_query = await client.query(
            //     `INSERT INTO public.employee (employee_id, user_id, employee_type, salary, branch_id)
            // VALUES (${new_user.employee_id}, ${new_user.user_id}, ${new_user.employee_type}, ${new_user.salary}, ${new_user.branch_id} ) `,
            employee_queryInsert.text,
            employee_queryInsert.values,
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
        appointment: IAppointment;
        user_id: number;
    }>,
    res: express.Response,
) => {
    try {
        var appointment: IAppointment = req.body.appointment;
        var user_id: number = req.body.user_id;

        const patient_query = await client.query(
            `SELECT public.patients.patient_id FROM public.patients WHERE user_id = ${user_id}`,
        );

        appointment.patient_id = patient_query.rows[0].patient_id;

        if (appointment.appointment_id == 0) {
            let max = 9999;
            let min = 100;
            appointment.appointment_id = Math.floor(
                Math.random() * (max - min) + min,
            );
        }

        const dentist_query = await client.query(
            `SELECT public.employee.employee_id FROM public.employee WHERE user_id= ${appointment.dentist_id}`,
        );

        appointment.dentist_id = dentist_query.rows[0].employee_id;

        appointment.fee_id = "6";

        const queryInsert = {
            text: `INSERT INTO public.appointments (date, duration, status, appointment_type, appointment_id, dentist_id, patient_id, fee_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            values: [
                appointment.date,
                appointment.duration,
                appointment.status,
                [appointment.appointment_type],
                appointment.appointment_id,
                appointment.dentist_id,
                appointment.patient_id,
                appointment.fee_id,
            ],
        };

        const appointment_insert = await client.query(
            queryInsert.text,
            queryInsert.values,
        );

        return res.status(201);
    } catch (err: any) {
        console.error(err.message);
    }
};

//gets IPatient object from a patient ID
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
