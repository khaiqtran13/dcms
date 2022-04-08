import React from "react";
import { IUser } from "../../server/src/database/user.types";

export interface IAppContext {
    user?: IUser;
    setUserInContext: (user: IUser) => void;
}

export const AppContext = React.createContext<IAppContext | null>(null);
