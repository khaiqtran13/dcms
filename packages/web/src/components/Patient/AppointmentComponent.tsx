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
import { IAppointment } from "../../../../server/src/database/gen.types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../../../../server/src/database/user.types";
import { AppContext, IAppContext } from "../../AppContext";

type Props = {};

export const AppointmentComponent = (props: Props) => {
    const [startValue, setStartValue] = React.useState<Date | null>(new Date());
    const [endValue, setEndValue] = React.useState<Date | null>(new Date());
    const [procedure, setProcedure] = React.useState<string>("");
    const [selectedDentistID, setSelectedDentistID] = React.useState<number>();

    const [dentists, setDentists] = React.useState<IUser[]>();

    const context: IAppContext | null = React.useContext(AppContext);

    const handleStartTimeChange = (newValue: Date | null) => {
        setStartValue(newValue);
    };

    const handleProcChange = (event: SelectChangeEvent) => {
        setProcedure(event.target.value as string);
    };

    React.useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/user/dentists",
        })
            .then((response: AxiosResponse) => {
                const fetchedDentists = response.data;
                setDentists(fetchedDentists);
                console.log(dentists);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    }, []);

    const handleSubmit = () => {
        if (
            startValue &&
            endValue &&
            procedure &&
            selectedDentistID &&
            context?.user?.user_id
        ) {
            const appointment: IAppointment = {
                date: startValue,
                duration: 60,
                status: "incomplete",
                appointment_type: procedure,
                appointment_id: 0,
                dentist_id: selectedDentistID,
            };
            axios({
                method: "POST",
                url: "http://localhost:8000/api/appointments/set/",
                data: {
                    appointment: appointment,
                    user_id: context?.user.user_id,
                },
            }).catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
        }
    };

    return (
        <Paper className="w-96 p-8" elevation={8}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex flex-col space-y-4 mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">
                        Book Appointment
                    </h1>
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/dd/yyyy"
                        value={startValue}
                        onChange={handleStartTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="Start Time"
                        value={startValue}
                        onChange={handleStartTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <FormControl>
                        <InputLabel id="doctor-label">Doctor</InputLabel>
                        <Select
                            labelId="doctor-label"
                            onChange={(event) => {
                                setSelectedDentistID(
                                    Number(event.target.value),
                                );
                            }}
                        >
                            {dentists?.map((d) => {
                                return (
                                    <MenuItem value={d.user_id}>
                                        Dr. {d.last_name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="procedure-label">Procedure</InputLabel>
                        <Select
                            labelId="procedure-label"
                            value={procedure}
                            onChange={handleProcChange}
                        >
                            <MenuItem value={"Fillings"}>Fillings</MenuItem>
                            <MenuItem value={"Teeth Whitening"}>
                                Teeth Whitening
                            </MenuItem>
                            <MenuItem value={"Extractions"}>
                                Extractions
                            </MenuItem>
                        </Select>
                    </FormControl>
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
