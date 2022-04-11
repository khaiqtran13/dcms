import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { IPatient } from "../../../../server/src/database/user.types";

type Props = {};

const AddPatientComponent: React.FC = ({}: Props) => {
    const [firstName, setFirstName] = React.useState<string>();
    const [middleName, setMiddleName] = React.useState<string>();
    const [lastName, setLastName] = React.useState<string>();
    const [streetAddress, setStreetAddress] = React.useState<string>();
    const [city, setCity] = React.useState<string>();
    const [province, setProvince] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [role, setRole] = React.useState<string>();
    const [SSN, setSSN] = React.useState<number>();

    const [gender, setGender] = React.useState<string>();
    const [insurance, setInsurance] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [DOB, setDOB] = React.useState<Date | null>(new Date());

    const handleTimeChange = (newValue: Date | null) => {
        setDOB(newValue);
    };

    const handleSSN = (event: any) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex

        if (event.target.value === "" || re.test(event.target.value)) {
            setSSN(event.target.value);
        }
    };

    const validate = () => {
        return !!(
            firstName &&
            middleName &&
            lastName &&
            streetAddress &&
            city &&
            province &&
            password &&
            role &&
            SSN &&
            gender &&
            insurance &&
            email &&
            DOB
        );
    };

    const handleSubmit = () => {
        if (
            firstName &&
            middleName &&
            lastName &&
            streetAddress &&
            city &&
            province &&
            password &&
            role &&
            SSN &&
            gender &&
            insurance &&
            email &&
            DOB
        ) {
            const patient: IPatient = {
                patient_id: undefined,
                gender: gender,
                insurance: insurance,
                email_address: email,
                DOB: DOB,
                payment_id: undefined,
                record_id: undefined,
                user_id: 0,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                street_address: streetAddress,
                city: city,
                province: province,
                password: password,
                role: role,
                ssn: SSN,
            };
            console.log(patient);
        }
    };

    return (
        <div>
            <Paper className="w-96 p-8 mx-auto" elevation={8}>
                <h1 className="text-2xl font-semibold mb-4">Add Patient</h1>
                <FormControl fullWidth className="space-y-4">
                    <TextField
                        value={firstName}
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}
                        label="First Name"
                        variant="outlined"
                    />
                    <TextField
                        value={middleName}
                        onChange={(event) => {
                            setMiddleName(event.target.value);
                        }}
                        label="Middle Name"
                        variant="outlined"
                    />
                    <TextField
                        value={lastName}
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}
                        label="Last Name"
                        variant="outlined"
                    />
                    <TextField
                        value={streetAddress}
                        onChange={(event) => {
                            setStreetAddress(event.target.value);
                        }}
                        label="Street Address"
                        variant="outlined"
                    />
                    <TextField
                        value={city}
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                        label="City"
                        variant="outlined"
                    />
                    <TextField
                        value={province}
                        onChange={(event) => {
                            setProvince(event.target.value);
                        }}
                        label="Province"
                        variant="outlined"
                    />
                    <TextField
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        label="Password"
                        variant="outlined"
                    />
                    <TextField
                        value={role}
                        onChange={(event) => {
                            setRole(event.target.value);
                        }}
                        label="Role"
                        variant="outlined"
                    />
                    <TextField
                        value={SSN}
                        onChange={(event) => {
                            handleSSN(event);
                        }}
                        type="number"
                        label="SSN"
                        variant="outlined"
                    />
                    <TextField
                        value={gender}
                        onChange={(event) => {
                            setGender(event.target.value);
                        }}
                        label="Gender"
                        variant="outlined"
                    />
                    <TextField
                        value={insurance}
                        onChange={(event) => {
                            setInsurance(event.target.value);
                        }}
                        label="Insurance"
                        variant="outlined"
                    />
                    <TextField
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        label="Email"
                        variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={DOB}
                            onChange={handleTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                        disabled={!validate()}
                    >
                        SUBMIT
                    </Button>
                </FormControl>
            </Paper>
        </div>
    );
};

export default AddPatientComponent;
