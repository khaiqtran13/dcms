import React from "react";
import { AppointmentComponent } from "./AppointmentComponent";
import { ReviewComponent } from "./ReviewComponent";

type Props = {};

const PatientHome = (props: Props) => (
    <div className="space-y-7">
        <AppointmentComponent></AppointmentComponent>
        <ReviewComponent />
    </div>
);

export default PatientHome;
