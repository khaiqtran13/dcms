import React, { useState } from "react";
import { IUser } from "../../server/src/database/user.types";
import "./App.css";
import { AppContext, IAppContext } from "./AppContext";
import SignInSide from "./components/SignInSide";

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

    return (
        <div className="App">
            {/* TODO: alerts */}
            <AppContext.Provider value={appContext}>
                <SignInSide />
            </AppContext.Provider>
        </div>
    );
}

export default App;
