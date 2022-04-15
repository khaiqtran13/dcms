import { Button, Dialog } from "@mui/material";
import React from "react";
import AddEmployeeComponent from "./AddEmployeeComponent";
import AddPatientComponent from "./AddPatientComponent";
import { RecepAppointmentComponent } from "./RecepAppointmentComponent";
import ViewPatientComponent from "./ViewPatientComponent";

type Props = {};

const ReceptionistMain = (props: Props) => {
    const [openAP, setOpenAP] = React.useState(false);
    const [openAE, setOpenAE] = React.useState(false);
    const [openRA, setOpenRA] = React.useState(false);

    return (
        <div>
            <div className="flex flex-col mx-auto place-content-center space-y-4 h-screen w-96">
                <ViewPatientComponent />
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
        </div>
    );
};

export default ReceptionistMain;
