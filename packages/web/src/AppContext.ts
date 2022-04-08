import React from "react";
import { IUser } from "../../server/src/database/user.types";
import { AlertColor } from "@mui/material";

export interface IAppContext {
    loggedin: boolean;

    // user tingsss
    user?: IUser;
    setUserInContext: (user: IUser) => void;
    updateUiserInContext: (user: IUser) => void;

    // success tokens
    alertText?: string;
    setAlert: (alertSeverity: AlertColor, alertText: string) => void;
}

export const AppContext = React.createContext<IAppContext | null>(null);
