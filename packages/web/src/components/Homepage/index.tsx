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