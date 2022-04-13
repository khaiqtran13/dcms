import React from "react";
import { AppointmentComponent } from "./AppointmentComponent";
import { CalendarComponent } from "./CalendarComponent";
import RecordAppointment from "./RecordAppointment";
import { ReviewComponent } from "./ReviewComponent";

type Props = {};

const PatientHome = (props: Props) => (
    <div className="space-y-7">
        <AppointmentComponent />
        <ReviewComponent />
        <CalendarComponent />
        <RecordAppointment />
    </div>
);

export default PatientHome;
