import { Card, CardContent, Divider, Paper, Stack } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { format } from "date-fns";
import React from "react";
import { IAppointment } from "../../../../server/src/database/gen.types";

type Props = {};

const appointments: IAppointment[] = [
    {
        user_id: 0,
        start_date: new Date(),
        end_time: "10:00",
        status: "string",
        cancel_date: new Date(),
        appointment_type: "Appointment",
        appointment_id: 1, // idk,
        dentist_id: 0,
    },
    {
        user_id: 0,
        start_date: new Date(),
        end_time: "6:00",
        status: "string",
        cancel_date: new Date(),
        appointment_type: "Appointment",
        appointment_id: 1, // idk,
        dentist_id: 0,
    },
];

export const CalendarComponent = (props: Props) => {
    const [appointmentList, setAppointmentList] =
        React.useState<IAppointment[]>();

    React.useState(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/appointments",
        })
            .then((response: AxiosResponse) => {
                // TODO: get backend to give only user specific appointments
                const fetchedAppointmentList = response.data;
                setAppointmentList(fetchedAppointmentList);
                console.log(fetchedAppointmentList);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    });

    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <h1 className="text-2xl font-semibold mb-4">
                Upcoming Appointments
            </h1>
            <Stack spacing={3}>
                {appointments.map((apt) => {
                    return (
                        <Card>
                            <CardContent>
                                <p className="text-xl font-semibold">
                                    {apt.appointment_type}
                                </p>
                                <Divider className="py-1" />
                                <p>
                                    Date:{" "}
                                    {format(apt.start_date, "MMMM do, yyyy")}
                                </p>
                                <p>Time: {format(apt.start_date, "H:mma")}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Paper>
    );
};
