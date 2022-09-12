import { AccessTokenEvents } from "oidc-client-ts";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { AuthProvider, useAuth } from "../src/.";

// username: akv.test@gmail.com
// password: Password@1
const oidcConfig = {
    authority: "https://dev-h749yi7d.us.auth0.com",
    client_id: "jhKC0vFO1Qo6T9ZT0006yzAKJ0LzLblC",
    redirect_uri: "http://localhost:7000",
};

function App() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                Hello {auth.user?.profile.sub}{" "}
                <button onClick={() => void auth.signinSilent()}>
                    SigninSilent
                </button>
                <button onClick={() => void auth.removeUser()}>
                    Log out
                </button>
            </div>
        );
    }

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

ReactDOM.render(
    <AuthProvider {...oidcConfig}>
        <App />
    </AuthProvider>,
    document.getElementById("root"),
);
