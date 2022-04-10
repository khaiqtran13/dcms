import { Button } from "@mui/material";
import React, { useState } from "react";
import { AppContext, IAppContext } from "../../AppContext";
import { userStore } from "../../localForage/users";

import DentistMain from "../Dentist";
import Errorpage from "../Errorpage";
import PatientMain from "../Patient";
import ReceptionistMain from "../Receptionist";

type Props = {};

const Homepage = (props: Props) => {
    const context: IAppContext | null = React.useContext(AppContext);

    var role = context?.user?.role;
    if (!role) {
        role = "Error";
    }

    const logout = () => {
        userStore.clear();
        window.location.reload();
    };

    return (
        <div className="h-full">
            <div>Logged in as {context?.user?.role}</div>
            {
                {
                    User: <PatientMain />,
                    Receptionist: <ReceptionistMain />,
                    Dentist: <DentistMain />,
                    Error: <Errorpage />,
                }[role]
            }
            <Button
                onClick={() => {
                    logout();
                }}
            >
                Logout
            </Button>
        </div>
    );
};

export default Homepage;
