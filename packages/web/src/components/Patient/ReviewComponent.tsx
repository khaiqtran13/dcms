import {
    Button,
    MenuItem,
    Paper,
    Rating,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { IReview } from "../../../../server/src/database/gen.types";
import React from "react";
import { AppContext, IAppContext } from "../../AppContext";

type Props = {};

export const ReviewComponent = (props: Props) => {
    const [professionalValue, setProfessionalValue] = React.useState<
        number | null
    >(5);
    const [cleanValue, setCleanValue] = React.useState<number | null>(5);
    const [communicationValue, setCommunicationValue] = React.useState<
        number | null
    >(5);

    const context: IAppContext | null = React.useContext(AppContext);

    const handleSubmit = () => {
        var review: IReview = {
            user_id: 0,
            professionalism: 0,
            communication: 0,
            cleanliness: 0,
            value: 0,
        };

        if (
            context?.user?.user_id &&
            professionalValue &&
            communicationValue &&
            cleanValue
        ) {
            review = {
                user_id: context?.user?.user_id,
                professionalism: professionalValue,
                communication: communicationValue,
                cleanliness: cleanValue,
                value:
                    (professionalValue + communicationValue + cleanValue) / 3,
            };
            console.log(review);
        }
    };

    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <h1 className="text-2xl font-semibold mb-4">Review</h1>
            <div className="flex flex-col">
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
                <Button
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    SUBMIT
                </Button>
            </div>
        </Paper>
    );
};
