import React from "react";
import { IUser } from "../../server/src/database/user";

export interface IAppContext {
    loggedin: boolean;

    user?: IUser;
}

export const AppContext = React.createContext<IAppContext | null>(null);
