import { Card, CardContent, Divider, Paper, Stack } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { IRecord } from "../../../../server/src/database/gen.types";
import { AppContext, IAppContext } from "../../AppContext";

type Props = {};

export default function RecordAppointment({}: Props) {
    const context: IAppContext | null = React.useContext(AppContext);
    const [record, setRecord] = React.useState<IRecord>();
    const [loading, setLoading] = React.useState<boolean>(true);

    const user_id = context?.user?.user_id;

    React.useState(() => {
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
    });
    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <h1 className="text-2xl font-semibold mb-4">Medical History</h1>
            <Stack spacing={3}>
                <Card>
                    <CardContent className="flex">
                        <Stack spacing={2}>
                            <h1 className="text-xl font-semibold">Chart</h1>
                            <Divider />
                            {!loading &&
                                record?.charts.map((c) => {
                                    return <p>{c}</p>;
                                })}
                        </Stack>
                        <Stack spacing={2}>
                            <h1 className="text-xl font-semibold">Notes</h1>
                            <Divider />
                            {!loading &&
                                record?.notes.map((c) => {
                                    return <p>{c}</p>;
                                })}
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Paper>
    );
}
