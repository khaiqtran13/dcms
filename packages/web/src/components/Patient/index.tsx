import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PatientHome from "./PatientHome";

type Props = {};

const PatientMain = (props: Props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PatientHome />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default PatientMain;
