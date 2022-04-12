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
        startDate: new Date(),
        endDate: new Date(),
        status: "string",
        cancelDate: new Date(),
        appointment_type: "Appointment",
        appointment_id: 1, // idk
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
                                    {format(apt.startDate, "MMMM do, yyyy")}
                                </p>
                                <p>
                                    Time: {format(apt.startDate, "H:mma")} -{" "}
                                    {format(apt.endDate, "H:mma")}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Paper>
    );
};
