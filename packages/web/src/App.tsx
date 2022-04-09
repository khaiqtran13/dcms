import { createTheme, Theme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { IUser } from "../../server/src/database/user.types";
import "./App.css";
import { AppContext, IAppContext } from "./AppContext";
import SignInSide from "./components/SignInSide";
import Homepage from "./components/Homepage";

function App() {
    const [contextUser, setContextUser] = useState<IUser | undefined>();

    const updateContextUser = (user: IUser) => {
        setContextUser(user);
        // maybe set user in cache?
    };
    const appContext: IAppContext = {
        user: contextUser,
        setUserInContext: updateContextUser,
    };

    const darkTheme: Theme = createTheme({
        palette: {
            mode: "dark",
            secondary: {
                main: "#ff0000",
            },
            background: {
                default: "#121212",
            },
            success: {
                main: "#15A23A",
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            {/* TODO: alerts */}
            <AppContext.Provider value={appContext}>
                {contextUser ? <Homepage /> : <SignInSide />}
                {/* <SignInSide/> */}
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
