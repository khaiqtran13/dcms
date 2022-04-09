import { Button } from "@mui/material";
import React, { useState } from "react";
import { AppContext, IAppContext } from "../../AppContext";

type Props = {};

const Homepage = (props: Props) => {
    const context: IAppContext | null = React.useContext(AppContext);
    return (
        <div>
            <Button
                onClick={() => {
                    console.log(context?.user);
                }}
            >
                WHATS POPPING
            </Button>
        </div>
    );
};

export default Homepage;
