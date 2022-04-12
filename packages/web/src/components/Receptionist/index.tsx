import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddEmployeeComponent from "./AddEmployeeComponent";
import AddPatient from "./AddPatient";
import AddPatientComponent from "./AddPatientComponent";
import EditPatient from "./EditPatient";
import ReceptionistHome from "./ReceptionistHome";
import SetPatient from "./SetPatient";

type Props = {};

const ReceptionistMain = (props: Props) => {
    return (
        <BrowserRouter>
            <span className="flex">
                <AddPatientComponent />
                <AddEmployeeComponent />
            </span>
            <Routes>
                <Route path="/" element={<ReceptionistHome />}></Route>
                <Route path="add" element={<AddPatient />}></Route>
                <Route path="edit" element={<EditPatient />}></Route>
                <Route path="set" element={<SetPatient />}></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default ReceptionistMain;
