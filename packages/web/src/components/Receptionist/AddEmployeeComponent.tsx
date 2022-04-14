import { Button, FormControl, Paper, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import React from "react";
import { IEmployee } from "../../../../server/src/database/user.types";

type Props = {};

const AddEmployeeComponent = (props: Props) => {
    const [firstName, setFirstName] = React.useState<string>();
    const [middleName, setMiddleName] = React.useState<string>();
    const [lastName, setLastName] = React.useState<string>();
    const [streetAddress, setStreetAddress] = React.useState<string>();
    const [city, setCity] = React.useState<string>();
    const [province, setProvince] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [role, setRole] = React.useState<string>();
    const [SSN, setSSN] = React.useState<number>();

    const [employeeType, setEmployeeType] = React.useState<string>();
    const [salary, setSalary] = React.useState<number>();
    //const [branchId, setBranchId] = React.useState<number>();

    const handleSSN = (event: any) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex

        if (event.target.value === "" || re.test(event.target.value)) {
            setSSN(event.target.value);
        }
    };

    const handleSalary = (event: any) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex

        if (event.target.value === "" || re.test(event.target.value)) {
            setSalary(event.target.value);
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
            employeeType &&
            salary
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
            employeeType &&
            salary
        ) {
            const employee: IEmployee = {
                user_id: 0,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                city: city,
                street_address: streetAddress,
                province: province,
                password: password,
                role: role,
                ssn: SSN,
                employee_id: 0, // PK
                record_id: "", // FK
                employee_type: employeeType,
                salary: salary,
                branch_id: 1,
            };
            axios({
                method: "POST",
                url: "http://localhost:8000/api/employee/add",
                data: {
                    new_employee: employee,
                },
            }).catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
            console.log(employee);
        }
    };
    return (
        <Paper className="w-96 p-8 mx-auto" elevation={8}>
            <h1 className="text-2xl font-semibold mb-4">Add Employee</h1>
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
                    value={employeeType}
                    onChange={(event) => {
                        setEmployeeType(event.target.value);
                    }}
                    label="Employee Type"
                    variant="outlined"
                />
                <TextField
                    value={salary}
                    onChange={(event) => {
                        handleSalary(event);
                    }}
                    type="number"
                    label="Salary"
                    variant="outlined"
                />
                {/* <TextField
                    value={branchId}
                    onChange={(event) => {
                        handleSalary(event);
                    }}
                    type="number"
                    label="Salary"
                    variant="outlined"
                /> */}
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
    );
};

export default AddEmployeeComponent;
