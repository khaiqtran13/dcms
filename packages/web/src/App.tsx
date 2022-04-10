import { Button, Paper, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { IUser } from "../../server/src/database/user.types";
import "./App.css";
import { AppContext, IAppContext } from "./AppContext";
import SignInSide from "./components/SignInSide";
import Homepage from "./components/Homepage";
import { darkTheme } from "./theme";
import { setUserInLocalCache, userStore } from "./localForage/users";

function App() {
    const [contextUser, setContextUser] = useState<IUser | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    const updateContextUser = (user: IUser) => {
        setContextUser(user);
        setUserInLocalCache(user);
    };

    const appContext: IAppContext = {
        user: contextUser,
        setUserInContext: updateContextUser,
    };

    React.useEffect(() => {
        userStore
            .keys()
            .then(async function (keys: any[]) {
                // An array of all the key names.
                const cachedUser: IUser | null = await userStore.getItem(
                    keys[0],
                );
                if (cachedUser) {
                    setContextUser(cachedUser);
                    console.log(cachedUser);
                }
                setLoading(false);
            })
            .catch(function (err: any) {
                // This code runs if there were any errors
                console.log("ah shit I broke it", err);
            });
    }, []);

    if (loading) return <ThemeProvider theme={darkTheme}></ThemeProvider>;
    return (
        <ThemeProvider theme={darkTheme}>
            <AppContext.Provider value={appContext}>
                <Paper className="h-screen" square>
                    {contextUser ? <Homepage /> : <SignInSide />}
                </Paper>
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
