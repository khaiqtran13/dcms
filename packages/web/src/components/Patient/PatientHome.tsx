import React from "react";
import { AppointmentComponent } from "./AppointmentComponent";

type Props = {};

const PatientHome = (props: Props) => {
    return (
        <div>
            Patient Home<AppointmentComponent></AppointmentComponent>
        </div>
    );
};

export default PatientHome;
