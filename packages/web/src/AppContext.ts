import React from "react";

export interface IAppContext {
    loggedin: boolean;

    // user?: any;
    // TODO: USER TYPE FIX ^^^
}

export const AppContext = React.createContext<IAppContext | null>(null);
