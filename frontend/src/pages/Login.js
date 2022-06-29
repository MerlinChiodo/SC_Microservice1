import React, { useEffect } from "react";
import { PageContainer } from "../components/PageContainer";
import { Text, Button } from "@mantine/core";
import { ExternalLink } from 'tabler-icons-react';
import { AUTH_URL } from "../util/Constants";

export const Login = (props) => {

    useEffect(() => {
        document.title = "Bürgerbüro - Login";
    });

    const host = window.location.origin;
    const success = `${host}${props.redirect}`;
    const error = `${host}/error`;
    const url = `${AUTH_URL}/external?redirect_success=${success}&redirect_error=${error}`;

    return (
        <PageContainer>
            <Text size="xl" weight={700} align="center">Du musst angemeldet sein um diese Seite aufzurufen</Text>
            <Button component="a" href={url} leftIcon={<ExternalLink size={14} />} fullWidth mt={15} variant="outline">
                Jetzt anmelden
            </Button>
        </PageContainer>
    );
};
