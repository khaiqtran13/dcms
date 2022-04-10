import { createTheme, Theme } from "@mui/material";

export const darkTheme: Theme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: "#ff0000",
        },
        background: {
            default: "#121212",
        },
        success: {
            main: "#15A23A",
        },
    },
});
