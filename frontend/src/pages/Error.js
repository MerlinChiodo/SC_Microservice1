import React, { useEffect } from "react";
import { PageContainer } from "../components/PageContainer";
import { Text, Button } from "@mantine/core";
import { ExternalLink } from 'tabler-icons-react';

export const Error = () => {

    useEffect(() => {
        document.title = "Bürgerbüro - Fehler";
    });

    const host = window.location.origin;
    const url = `http://auth.smartcityproject.net:8080/external?redirect_success=${host}&redirect_error=${host}/error`;

    return (
        <PageContainer>
            <Text size="xl" weight={700} align="center">Es gab einen Fehler bei der Anmeldung</Text>
            <Button component="a" href={url} leftIcon={<ExternalLink size={14} />} fullWidth mt={15} variant="outline">
                Erneut versuchen
            </Button>
        </PageContainer>
    );
};
