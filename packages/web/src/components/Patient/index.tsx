import { Button, Dialog, DialogContent, Slide } from "@mui/material";
import React from "react";
import { AppointmentComponent } from "./AppointmentComponent";
import { CalendarComponent } from "./CalendarComponent";
import MedicalHistoryComponent from "./MedicalHistoryComponent";
import { ReviewComponent } from "./ReviewComponent";

type Props = {};

const PatientHome = (props: Props) => {
    const [openBA, setOpenBA] = React.useState(false);
    const [openRC, setOpenRC] = React.useState(false);
    const [openRA, setOpenRA] = React.useState(false);
    const [openCC, setOpenCC] = React.useState(false);

    return (
        <div className="flex flex-col mx-auto place-content-center space-y-4 h-screen w-96">
            <Button
                fullWidth
                variant="contained"
                onClick={() => {
                    setOpenBA(true);
                }}
            >
                📕 Book Appointment
            </Button>
            <Dialog
                open={openBA}
                onClose={() => {
                    setOpenBA(false);
                }}
            >
                <AppointmentComponent />
            </Dialog>
            <Button
                fullWidth
                variant="contained"
                onClick={() => {
                    setOpenRC(true);
                }}
            >
                ⭐️ Post Review
            </Button>
            <Dialog
                open={openRC}
                onClose={() => {
                    setOpenRC(false);
                }}
            >
                <ReviewComponent />
            </Dialog>
            <Button
                fullWidth
                variant="contained"
                onClick={() => {
                    setOpenRA(true);
                }}
            >
                🏥 View Medical History
            </Button>
            <Dialog
                open={openRA}
                onClose={() => {
                    setOpenRA(false);
                }}
            >
                <MedicalHistoryComponent />
            </Dialog>
            <Button
                fullWidth
                variant="contained"
                onClick={() => {
                    setOpenCC(true);
                }}
            >
                📅 View Calendar
            </Button>
            <Dialog
                open={openCC}
                onClose={() => {
                    setOpenCC(false);
                }}
            >
                <CalendarComponent />
            </Dialog>
        </div>
    );
};

export default PatientHome;
