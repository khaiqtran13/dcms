import {
    Card,
    CardContent,
    Dialog,
    Divider,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { IPatient } from "../../../../server/src/database/user.types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    IAppointment,
    IRecord,
} from "../../../../server/src/database/gen.types";
import { format } from "date-fns";

type Props = {};

export default function ViewPatientComponent({}: Props) {
    const [patientList, setPatientList] = React.useState<IPatient[]>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [appointmentList, setAppointmentList] = React.useState<
        IAppointment[]
    >([]);

    const [openEP, setOpenEP] = React.useState(false);
    const [currPID, setCurrPID] = React.useState<number>();
    const [record, setRecord] = React.useState<IRecord>();

    React.useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/user/role/User",
        })
            .then((response: AxiosResponse) => {
                setPatientList(response.data);
                setLoading(false);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    }, []);

    const getPatientMedicalHistory = (user_id: number) => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/records/${user_id}`,
        })
            .then((response: AxiosResponse) => {
                setRecord(response.data[0]);
                // console.log("record", response.data[0]);
                setLoading(false);
            })

            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    };

    const getPatientAppointments = (user_id: number) => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/appointments/${user_id}`,
        })
            .then((response: AxiosResponse) => {
                const fetchedAppointmentList = response.data;
                setAppointmentList(fetchedAppointmentList);
                console.log(fetchedAppointmentList);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    };

    return (
        <div>
            <Dialog
                open={openEP}
                onClose={() => {
                    setOpenEP(false);
                }}
            >
                <Stack spacing={3} minWidth={420}>
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
                <Divider className="py-3" />{" "}
                <Stack spacing={3}>
                    <Card>
                        <CardContent className="flex justify-between">
                            <Stack spacing={2}>
                                <h1 className="text-xl font-semibold">Chart</h1>
                                <Divider />
                                {record?.charts.map((c) => {
                                    return <p>{c}</p>;
                                })}
                            </Stack>
                            <Stack spacing={2}>
                                <h1 className="text-xl font-semibold">Notes</h1>
                                <Divider />
                                {record?.notes.map((c) => {
                                    return <p>{c}</p>;
                                })}
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Dialog>
            <TableContainer component={Paper}>
                <Table sx={{ maxHeight: 420 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">User&nbsp;ID</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading &&
                            patientList?.map((p: IPatient) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {p.first_name} {p.last_name}
                                        </TableCell>
                                        <TableCell>{p.user_id}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => {
                                                    setOpenEP(true);
                                                    setCurrPID(p.user_id);
                                                    getPatientAppointments(
                                                        p.user_id,
                                                    );
                                                    getPatientMedicalHistory(
                                                        p.user_id,
                                                    );
                                                }}
                                            >
                                                <VisibilityIcon></VisibilityIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
