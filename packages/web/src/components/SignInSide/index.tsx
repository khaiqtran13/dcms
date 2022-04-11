import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../../../../server/src/database/user.types";
import { AppContext, IAppContext } from "../../AppContext";

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
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // TODO: Can someone please verify if our copyright is cited correctly here?
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
        const data = new FormData(event.currentTarget);
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
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    className="break-all bg-black "
                >
                    <h1
                        style={{ fontSize: "420px", lineHeight: "420px" }}
                        className="font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-indigo-300 to-purple-800"
                    >
                        DCMS
                    </h1>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    direction={"column"}
                    className="flex justify-center"
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
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                // onClick={() => login}
                            >
                                Sign In
                            </Button>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid> */}
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignInSide;
