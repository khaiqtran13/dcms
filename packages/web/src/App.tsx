import { createTheme, Theme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { IUser } from "../../server/src/database/user.types";
import "./App.css";
import { AppContext, IAppContext } from "./AppContext";
import SignInSide from "./components/SignInSide";
import Homepage from "./components/Homepage";
import { setUserInLocalCache, userStore } from "./localForage/users";

function App() {
    const [contextUser, setContextUser] = useState<IUser | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    const updateContextUser = (user: IUser) => {
        setContextUser(user);
        setUserInLocalCache(user);
    };

    const context: IAppContext | null = React.useContext(AppContext);

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
    React.useEffect(() => {
        userStore
            .keys()
            .then(async function (keys) {
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
            .catch(function (err) {
                // This code runs if there were any errors
                console.log("ah shit I broke it", err);
            });
    }, []);

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
    if (loading) return <ThemeProvider theme={darkTheme}></ThemeProvider>;
    return (
        <ThemeProvider theme={darkTheme}>
            {/* TODO: alerts */}

            <AppContext.Provider value={appContext}>
<<<<<<< HEAD
                {contextUser ? <Homepage /> : <SignInSide />}
=======
                    {contextUser ? <Homepage/>  : <SignInSide /> }
                    {/* <SignInSide/> */}
>>>>>>> 0ea3e1d (inital changes)
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
