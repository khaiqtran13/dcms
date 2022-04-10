import {
    MenuItem,
    Paper,
    Rating,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import React from "react";

type Props = {};

export const ReviewComponent = (props: Props) => {
    const [professionalValue, setProfessionalValue] = React.useState<
        number | null
    >(2);
    const [cleanValue, setCleanValue] = React.useState<number | null>(2);
    const [communicationValue, setCommunicationValue] = React.useState<
        number | null
    >(2);
    const [branch, setBranch] = React.useState<string>("");

    const handleBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };

    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <h1 className="text-2xl font-semibold mb-2">Review</h1>
            <div className="flex flex-col">
                <Select
                    labelId="procedure-label"
                    id="procedure-label"
                    title="Procedure"
                    value={branch}
                    label="procedure-label"
                    onChange={handleBranchChange}
                    className="mb-4"
                >
                    {/* TODO: get these from database instead */}
                    <MenuItem value={"Off White"}>Off White</MenuItem>
                    <MenuItem value={"Supreme"}>Supreme</MenuItem>
                </Select>
                <Typography component="legend">Professionalism</Typography>
                <Rating
                    value={professionalValue}
                    onChange={(event, newValue) => {
                        setProfessionalValue(newValue);
                    }}
                    className="mb-4"
                />
                <Typography component="legend">Cleanliness</Typography>
                <Rating
                    value={cleanValue}
                    onChange={(event, newValue) => {
                        setCleanValue(newValue);
                    }}
                    className="mb-4"
                />
                <Typography component="legend">Communication</Typography>
                <Rating
                    value={communicationValue}
                    onChange={(event, newValue) => {
                        setCommunicationValue(newValue);
                    }}
                    className="mb-4"
                />
            </div>
        </Paper>
    );
};
