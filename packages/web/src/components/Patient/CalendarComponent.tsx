import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
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
