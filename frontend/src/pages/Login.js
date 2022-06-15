import React, { useEffect } from "react";

export const Login = (props) => {

    useEffect(() => {
        document.title = "Bürgerbüro - Startseite";
    });

    return (
        <div>
            <h1>Du musst angemeldet sein um diese Seite aufzurufen.</h1>
        </div>
    );
};
