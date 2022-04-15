import React from "react";
import ViewPatientInfoComponent from "./ViewPatientInfoComponent";

type Props = {};

const DentistMain = (props: Props) => {
    return (
        <div className="flex flex-col mx-auto place-content-center space-y-4 h-screen w-96">
            <ViewPatientInfoComponent />
        </div>
    );
};

export default DentistMain;
