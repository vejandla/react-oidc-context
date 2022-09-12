/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import * as ReactDOM from "react-dom";

import { AuthProvider, useAuth, hasAuthParams } from "../src/.";

// username: akv.test@gmail.com
// password: Password@1
const oidcConfig = {
    authority: "https://dev-h749yi7d.us.auth0.com",
    client_id: "jhKC0vFO1Qo6T9ZT0006yzAKJ0LzLblC",
    redirect_uri: "http://localhost:7000",
};

function App() {
    const auth = useAuth();
    React.useEffect(() => {
        if (
            !hasAuthParams() &&
            !auth.isAuthenticated &&
            !auth.activeNavigator &&
            !auth.isLoading
        ) {
            //capture the url user is trying to access?
            window.sessionStorage.setItem(
                "redirectTo",
                `${location.pathname}${location.search}`,
            );
            auth.signinRedirect({ redirectMethod: "replace" });
        }
    }, [auth]);

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

    return <></>;
}

ReactDOM.render(
    <AuthProvider {...oidcConfig}>
        <App />
    </AuthProvider>,
    document.getElementById("root"),
);
