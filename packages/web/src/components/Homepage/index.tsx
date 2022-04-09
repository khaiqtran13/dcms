import { Button } from "@mui/material";
import React, { useState } from "react";
import { AppContext, IAppContext } from "../../AppContext";

type Props = {};

const Homepage = (props: Props) => {
    const context: IAppContext | null = React.useContext(AppContext);

    const role = context?.user?.role;

    return (
        <div>
            {/* 
            
            
            
            */}
        </div>
    );
};

export default Homepage;
