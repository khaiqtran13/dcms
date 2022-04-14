import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { IPatient, IUser } from "../../../../server/src/database/user.types";
import axios, { AxiosError, AxiosResponse } from "axios";

const EditPatientComponent = (props: any) => {
    const { passedInUID, passedInPID } = props;

    const [loading, setLoading] = React.useState<boolean>(true);

    const [firstName, setFirstName] = React.useState<string>();
    const [middleName, setMiddleName] = React.useState<string>();
    const [lastName, setLastName] = React.useState<string>();
    const [streetAddress, setStreetAddress] = React.useState<string>();
    const [city, setCity] = React.useState<string>();
    const [province, setProvince] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
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

    React.useEffect(() => {
        axios({
            method: "GET",
            // UID broken?

            url: `http://localhost:8000/api/user/${passedInUID}`,
        })
            .then((response: AxiosResponse) => {
                console.log(response.data);
                setFirstName(response.data.first_name);
                setLastName(response.data.middle_name);
                setLastName(response.data.last_name);
                setStreetAddress(response.data.street_address);
                setCity(response.data.city);
                setProvince(response.data.province);
                setPassword(response.data.password);
                setLoading(false);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    }, []);

    React.useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/patients/object/${passedInPID}`,
        })
            .then((response: AxiosResponse) => {
                console.log("patient", response.data);
                setGender(response.data.gender);
                setInsurance(response.data.insurance);
                setEmail(response.data.email_address);
                setSSN(Number(response.data.ssn));
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    }, []);

    const validate = () => {
        return !!(
            firstName &&
            middleName &&
            lastName &&
            streetAddress &&
            city &&
            province &&
            password &&
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
            SSN &&
            gender &&
            insurance &&
            email &&
            DOB
        ) {
            const patient: IPatient = {
                patient_id: passedInUID,
                gender: gender,
                insurance: insurance,
                email_address: email,
                date_of_birth: DOB,
                payment_id: undefined,
                record_id: undefined,
                user_id: passedInUID,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                street_address: streetAddress,
                city: city,
                province: province,
                password: password,
                ssn: SSN,
            };
        }
    };

    return (
        <div>
            <Paper className="w-96 p-8 mx-auto" elevation={8}>
                <h1 className="text-2xl font-semibold mb-4">Edit Patient</h1>
                {!loading && (
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
                                label="Date of Birth"
                                inputFormat="MM/dd/yyyy"
                                value={DOB}
                                onChange={handleTimeChange}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
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
                )}
            </Paper>
        </div>
    );
};

export default EditPatientComponent;
