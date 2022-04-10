import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MedHistory from "./MedHistory";
import PatientHome from "./PatientHome";
import ScheduleApps from "./ScheduleApps";
import UpcomingApps from "./UpcomingApps";

type Props = {};

const PatientMain = (props: Props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PatientHome />}></Route>
                <Route path="history" element={<MedHistory />}></Route>
                <Route path="schedule" element={<ScheduleApps />}></Route>
                <Route path="upcoming" element={<UpcomingApps />}></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default PatientMain;
