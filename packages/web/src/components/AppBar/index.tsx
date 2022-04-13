import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { userStore } from "../../localForage/users";

export const TopAppBar = (props: any) => {
    const logout = () => {
        userStore.clear();
        window.location.reload();
    };
    const { userRole } = props;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="flex justify-between">
                    <span className="flex">
                        <p className="flex text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">
                            DCMS:
                        </p>
                        <p className="text-5xl font-semibold text-white ml-2">
                            {userRole}
                        </p>
                    </span>
                    <Button
                        onClick={() => {
                            logout();
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
