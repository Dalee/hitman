import React from "react";
import AppLayout from "../containers/AppLayout";

class Error404 extends React.Component {
    render() {
        return (
            <AppLayout>
                <h1>404</h1>
                <p>Oops, something went wrong...</p>
            </AppLayout>
        )
    }
}

export default Error404;
