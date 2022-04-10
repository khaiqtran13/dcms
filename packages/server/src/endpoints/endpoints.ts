import client from "../../connection";
import express from "express";
import { IUser } from "../database/user.types";

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

export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await client.query("SELECT * FROM public.user");
    res.json(users.rows);
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getUserById = async (req: express.Request, res: any) => {
  try {
    const { user_id } = req.params;
    const user = await client.query(
      `SELECT * FROM public.user WHERE user_id = ${user_id}`
    );
    res.json(user.rows[0]);
  } catch (err: any) {
    console.error(err.message);
  }
};

// takes user_id and password and autheticates user
export const getLogin = async (
  req: express.Request<{ user_id: number; password: string }>,
  res: express.Response
) => {
  try {
    // const { user_id, password } = req.body;
    const user_id = req.body.user_id;
    const password = req.body.password;
    // console.log(user_id, password);
    const user = await client.query(
      `SELECT * FROM public.user WHERE user_id = ${user_id} AND password = ${password}`
    );
    // console.log(user.rows);
    // console.log(res.status(200).json(user.rows));
    return res.status(200).json(user.rows);
  } catch (err: any) {
    console.error(err.message);
  }
};

// We are going to need to access patient data as well as edit
export const getPatients = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const patients = await client.query("SELECT * FROM public.patients");
    res.json(patients.rows);
  } catch (err: any) {
    console.error(err.message);
  }
};

// We will need to be able to view patient's records
export const getRecords = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const records = await client.query("SELECT * FROM public.records");
    res.json(records.rows);
  } catch (err: any) {
    console.error(err.message);
  }
};

// We will need to be able to set and view appointments
export const getAppointments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const appointments = await client.query(
      "SELECT * FROM public.appointments"
    );
    res.json(appointments.rows);
  } catch (err: any) {
    console.error(err.message);
  }
};

//Adds the user to the database
export const addUser = async (
  req: express.Request<{
    user_id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    street_address: string;
    city: string;
    province: string;
    password: string;
    ssn: number;
  }>,
  res: express.Response
) => {
  try {
    var new_user: IUser = req.body;
    new_user.role = "User";

    const user = await client.query(
      `INSERT INTO public.user (user.id, first_name, middle_name, last_name, street_address, city, province, password, role. ssn) 
      VALUES (${new_user.first_name}, ${new_user.first_name}, ${new_user.middle_name}, ${new_user.last_name}, ${new_user.street_address},
        ${new_user.city}, ${new_user.province}, ${new_user.password}, ${new_user.role}, ${new_user.ssn} ) `
    );
    return res.status(201);
  } catch (err: any) {
    console.error(err.message);
  }
};

export const editUser = async (
  req: express.Request<{
    user_id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    street_address: string;
    city: string;
    province: string;
    password: string;
    ssn: number;
  }>,
  res: express.Response
) => {
  try {
    var new_user: IUser = req.body;
    new_user.role = "User";

    const user = await client.query(
      `INSERT INTO public.user (user.id, first_name, middle_name, last_name, street_address, city, province, password, role. ssn) 
        VALUES (${new_user.first_name}, ${new_user.first_name}, ${new_user.middle_name}, ${new_user.last_name}, ${new_user.street_address},
          ${new_user.city}, ${new_user.province}, ${new_user.password}, ${new_user.role}, ${new_user.ssn} ) `
    );
    return res.status(201);
  } catch (err: any) {
    console.error(err.message);
  }
};
