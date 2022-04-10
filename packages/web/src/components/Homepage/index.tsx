import { Button } from "@mui/material";
import React, { useState } from "react";
import { AppContext, IAppContext } from "../../AppContext";
import { TopAppBar } from "../AppBar";
import DentistMain from "../Dentist";
import Errorpage from "../Errorpage";
import PatientMain from "../Patient";
import ReceptionistMain from "../Receptionist";

type Props = {};

const Homepage = (props: Props) => {
    const context: IAppContext | null = React.useContext(AppContext);

    var role: string | undefined = context?.user?.role;
    if (!role) {
        role = "Error";
    }

    return (
        <div className="h-full">
            <TopAppBar userRole={role}></TopAppBar>
            {/* <div>Logged in as {context?.user?.role}</div> */}
            {
                {
                    User: <PatientMain />,
                    Receptionist: <ReceptionistMain />,
                    Dentist: <DentistMain />,
                    Error: <Errorpage />,
                }[role]
            }
        </div>
    );
};

export default Homepage;
