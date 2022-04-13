import { Card, CardContent, Divider, Paper, Stack } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { format } from "date-fns";
import React from "react";
import { IAppointment } from "../../../../server/src/database/gen.types";
import { AppContext, IAppContext } from "../../AppContext";

type Props = {};

export const CalendarComponent = (props: Props) => {
    const [appointmentList, setAppointmentList] = React.useState<
        IAppointment[]
    >([]);

    const context: IAppContext | null = React.useContext(AppContext);
    const [loading, setLoading] = React.useState<boolean>(true);

    const user_id = context?.user?.user_id;

    React.useState(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/appointments/${user_id}`,
        })
            .then((response: AxiosResponse) => {
                const fetchedAppointmentList = response.data;
                setAppointmentList(fetchedAppointmentList);
                console.log("fetched", fetchedAppointmentList);
                setLoading(false);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    });

    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
            <Stack spacing={3}>
                {!loading &&
                    appointmentList.length !== 0 &&
                    appointmentList.map((apt: IAppointment) => {
                        return (
                            <Card>
                                <CardContent>
                                    <Stack spacing={1}>
                                        <p className="text-xl font-semibold">
                                            {apt.appointment_type}
                                        </p>
                                        <Divider />
                                        <p>
                                            Date:{" "}
                                            {format(
                                                new Date(apt.date),
                                                "MMMM do, yyyy",
                                            )}
                                        </p>
                                        <p>
                                            Time:{" "}
                                            {format(
                                                new Date(apt.date),
                                                "H:mma",
                                            )}
                                        </p>
                                    </Stack>
                                </CardContent>
                            </Card>
                        );
                    })}
            </Stack>
        </Paper>
    );
};
