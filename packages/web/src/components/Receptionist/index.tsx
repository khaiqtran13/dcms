import { Button, Dialog } from "@mui/material";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddEmployeeComponent from "./AddEmployeeComponent";
import AddPatient from "./AddPatient";
import AddPatientComponent from "./AddPatientComponent";
import EditPatient from "./EditPatient";
import { RecepAppointmentComponent } from "./RecepAppointmentComponent";
import ReceptionistHome from "./ReceptionistHome";
import SetPatient from "./SetPatient";

type Props = {};

const ReceptionistMain = (props: Props) => {
    const [openAP, setOpenAP] = React.useState(false);
    const [openAE, setOpenAE] = React.useState(false);
    const [openRA, setOpenRA] = React.useState(false);

    return (
        <BrowserRouter>
            <div className="flex flex-col mx-auto place-content-center space-y-4 h-screen w-96">
                TODO: make this a drawer or make it prettier idk
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        setOpenAP(true);
                    }}
                >
                    🧑‍⚕️ Add Patient
                </Button>
                <Dialog
                    open={openAP}
                    onClose={() => {
                        setOpenAP(false);
                    }}
                >
                    <AddPatientComponent />
                </Dialog>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        setOpenAE(true);
                    }}
                >
                    👨‍💻 Add Employee
                </Button>
                <Dialog
                    open={openAE}
                    onClose={() => {
                        setOpenAE(false);
                    }}
                >
                    <AddEmployeeComponent />
                </Dialog>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        setOpenRA(true);
                    }}
                >
                    📕 Book Appointment
                </Button>
                <Dialog
                    open={openRA}
                    onClose={() => {
                        setOpenRA(false);
                    }}
                >
                    <RecepAppointmentComponent />
                </Dialog>
            </div>
            <Routes>
                <Route path="/" element={<ReceptionistHome />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default ReceptionistMain;
