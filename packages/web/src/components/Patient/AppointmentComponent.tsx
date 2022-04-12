import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
} from "@mui/material";

type Props = {};

export const AppointmentComponent = (props: Props) => {
    const [startValue, setStartValue] = React.useState<Date | null>(new Date());
    const [endValue, setEndValue] = React.useState<Date | null>(new Date());
    const [procedure, setProcedure] = React.useState<string>("");

    const handleDayChange = (newValue: Date | null) => {
        setStartValue(newValue);
        setEndValue(newValue);
    };

    const handleStartTimeChange = (newValue: Date | null) => {
        setStartValue(newValue);
    };

    const handleEndTimeChange = (newValue: Date | null) => {
        setEndValue(newValue);
    };

    const handleProcChange = (event: SelectChangeEvent) => {
        setProcedure(event.target.value as string);
    };

    const handleSubmit = () => {
        console.log("startTime:", startValue, "\nendTime:", endValue);
    };

    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex flex-col space-y-4 mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">
                        Book Appointment
                    </h1>
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/dd/yyyy"
                        value={startValue}
                        onChange={handleDayChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="Start Time"
                        value={startValue}
                        onChange={handleStartTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                    />{" "}
                    <TimePicker
                        label="End Time"
                        value={endValue}
                        onChange={handleEndTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    {/* TODO: fix this broken ass input label */}
                    {/* <InputLabel id="procedure-label">Procedure</InputLabel> */}
                    <Select
                        labelId="procedure-label"
                        id="procedure-label"
                        title="Procedure"
                        value={procedure}
                        label="procedure-label"
                        onChange={handleProcChange}
                    >
                        {/* TODO: get these from database instead */}
                        <MenuItem value={"Fillings"}>Fillings</MenuItem>
                        <MenuItem value={"Teeth Whitening"}>
                            Teeth Whitening
                        </MenuItem>
                        <MenuItem value={"Extractions"}>Extractions</MenuItem>
                    </Select>
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        SUBMIT
                    </Button>
                </div>
            </LocalizationProvider>
        </Paper>
    );
};
