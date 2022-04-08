<<<<<<< HEAD
import { Button } from "@mui/material";
import React, { useState } from "react";
import { IUser } from "../../../../server/src/database/user.types";
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


    return (
        <div>
            <div>Logged in as {context?.user?.role}</div>
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
=======
import React, { useState } from "react";
import {Routes, Route, Link} from 'react-router-dom';
import { IUser } from "../../../../server/src/database/user.types";
import { IAppContext } from "../../AppContext";

type Props = {}

const Homepage = (props: Props) => {
  //check what type of user, load the correct comps.
  const [contextUser, setContextUser] = useState<IUser | undefined>();

    const updateContextUser = (user: IUser) => {
        setContextUser(user);
        // maybe set user in cache?
    };
    const appContext: IAppContext = {
        user: contextUser,
        setUserInContext: updateContextUser,
    };

    console.log(contextUser);

  return (
    <div>{contextUser?.firstname}</div>
  )
}

export default Homepage;
>>>>>>> 0ea3e1d (inital changes)
