import axios from "axios";
import React from "react";
import "./App.css";
import SignInSide from "./components/SignInSide";

function App() {
    const fetchUpdatedContext = async () => {
        axios.get("/api/").then((response) => console.log(response.data));
    };

    React.useEffect(() => {
        fetchUpdatedContext();
    });

    return (
        <div className="App">
            <SignInSide />
        </div>
    );
}

export default App;
