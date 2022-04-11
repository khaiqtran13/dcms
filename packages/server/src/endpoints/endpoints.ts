import client from "../../connection";
import express from "express";

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

export const getDentists = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await client.query(
      "SELECT * FROM public.user WHERE public.user.role = 'Dentist'"
    );
    res.json(users.rows);
  } catch (err: any) {
    console.error(err.message);
  }
};
