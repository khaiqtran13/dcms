import {
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

type Props = {};

export default function ViewPatientComponent({}: Props) {
    const [patientList, setPatientList] = React.useState<IPatient[]>();
    const [loading, setLoading] = React.useState<boolean>(true);

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
            <TableContainer component={Paper}>
                <Table sx={{ maxHeight: 420 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">User&nbsp;ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patientList?.map((p) => {
                            return (
                                <TableRow>
                                    <TableCell>{p.email_address}</TableCell>
                                    <TableCell>{p.user_id}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
