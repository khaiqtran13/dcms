import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../../../../server/src/database/user.types";
import { AppContext, IAppContext } from "../../AppContext";

import { keyframes } from "styled-components";
import styled from "styled-components";

const hue = keyframes`
 from {
   -webkit-filter: hue-rotate(0deg);
 }
 to {
   -webkit-filter: hue-rotate(-360deg);
 }
`;
const AnimatedGradientText = styled.h1`
    color: #f35626;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: ${hue} 69s infinite linear;
    font-size: 169px;
    font-weight: 700;
    overflow-wrap: break-word;
    text-align: center;
    -moz-osx-font-smoothing: grayscale;
`;

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
                DCMS
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const SignInSide = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login();
    };

    const [userId, setUserId] = React.useState<number>(0);
    const [password, setPassword] = React.useState<string>("");

    const handleNoNum = (event: any) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex

        if (event.target.value === "" || re.test(event.target.value)) {
            setUserId(event.target.value);
        }
    };

    const context: IAppContext | null = React.useContext(AppContext);

    const login = async () => {
        axios({
            method: "post",
            url: `http://localhost:8000/api/login`,
            data: {
                user_id: userId,
                password: password,
            },
        })
            .then((response: AxiosResponse) => {
                const user: IUser = response.data[0];
                context?.setUserInContext(user);
                console.log(user);
                console.log("context", context);
            })
            .catch((error: AxiosError<string>) => {
                console.log(error.response?.data);
            });
    };

    return (
        <div>
            <Grid
                container
                sx={{ height: "100vh" }}
                className="place-content-center"
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <AnimatedGradientText>DCMS</AnimatedGradientText>

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="User ID"
                            autoFocus
                            type="number"
                            onChange={(event) => handleNoNum(event)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => login}
                        >
                            Sign In
                        </Button>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </div>
    );
};

export default SignInSide;
