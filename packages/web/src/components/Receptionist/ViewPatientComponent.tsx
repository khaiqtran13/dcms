import {
    Dialog,
    IconButton,
    Paper,
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
import EditIcon from "@mui/icons-material/Edit";
import EditPatientComponent from "./EditPatientComponent";

type Props = {};

export default function ViewPatientComponent({}: Props) {
    const [patientList, setPatientList] = React.useState<IPatient[]>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const [openEP, setOpenEP] = React.useState(false);
    const [currUID, setCurrUID] = React.useState<number>();
    const [currPID, setCurrPID] = React.useState<number>();

    React.useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/patients",
        })
            .then((response: AxiosResponse) => {
                setPatientList(response.data);
                setLoading(false);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    }, []);
    return (
        <div>
            <Dialog
                open={openEP}
                onClose={() => {
                    setOpenEP(false);
                }}
            >
                <EditPatientComponent
                    passedInPID={currPID}
                    passedInUID={currUID}
                ></EditPatientComponent>
            </Dialog>
            <TableContainer component={Paper}>
                <Table sx={{ maxHeight: 420 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">User&nbsp;ID</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading &&
                            patientList?.map((p: IPatient) => {
                                return (
                                    <TableRow>
                                        <TableCell>{p.email_address}</TableCell>
                                        <TableCell>{p.user_id}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => {
                                                    setOpenEP(true);
                                                    setCurrUID(p.user_id);
                                                    setCurrPID(p.patient_id);
                                                }}
                                            >
                                                <EditIcon />
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
