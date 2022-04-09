import { Button } from "@mui/material";
import React, { useState } from "react";
import { AppContext, IAppContext } from "../../AppContext";
import DentistMain from "../Dentist";
import Errorpage from "../Errorpage";
import PatientMain from "../Patient";
import ReceptionistMain from "../Receptionist";

type Props = {};

const Homepage = (props: Props) => {
    const context: IAppContext | null = React.useContext(AppContext);

    var role = context?.user?.role;
    if (!role){
        role = "Error";
    }
    return (
        <div>
            <div>Hello {context?.user?.first_name}</div>
            {
                {
                    'User': <PatientMain/>,
                    'Receptionist': <ReceptionistMain/>,
                    'Dentist': <DentistMain/>,
                    'Error': <Errorpage/>
                }[role]
            
            }
        </div>
    );
};

export default Homepage;
