import express from "express";
import { IUser } from "../database/user.types";

export async function login(
    req: express.Request<{}, {}, { email: string; password: string }>,
    res: express.Response<string>
) {
    const user: IUser = await 
}
