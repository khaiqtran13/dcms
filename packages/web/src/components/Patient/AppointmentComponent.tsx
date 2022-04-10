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
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [procedure, setProcedure] = React.useState<string>("");

    const handleTimeChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const handleProcChange = (event: SelectChangeEvent) => {
        setProcedure(event.target.value as string);
    };

    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex flex-col space-y-4 mx-auto">
                    <h1 className="text-2xl font-semibold mb-2">
                        Book Appointment
                    </h1>
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="Time"
                        value={value}
                        onChange={handleTimeChange}
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
                            console.log(value);
                        }}
                    >
                        SUBMIT
                    </Button>
                </div>
            </LocalizationProvider>
        </Paper>
    );
};
