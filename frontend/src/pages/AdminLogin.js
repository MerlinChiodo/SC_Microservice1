import { PageContainer } from "../components/PageContainer";
import { Text, Button, TextInput, Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ExclamationMark } from "tabler-icons-react";
import React, { useEffect } from "react";
import { useForm } from '@mantine/form';
import Cookies from "js-cookie";
import { AUTH_URL } from "../util/Constants";

export const AdminLogin = (props) => {

    const form = useForm({
        initialValues: {
            username: '', password: ''
        },
        validate: {
            username: (value) => (value.length > 0 ? null : 'Bitte geben Sie Ihren Benutzernamen ein'),
            password: (value) => (value.length > 0 ? null : 'Bitte geben Sie Ihr Passwort ein')
        }
    });

    const handleSubmit = (values) => {
        form.clearErrors();
        form.validate();
        console.log(values);
        const url = `${AUTH_URL}/employee/login`;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;', 'Accept': 'application/json' },
            body: 'username=' + encodeURIComponent(values.username) + '&password=' + encodeURIComponent(values.password)
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.error && data.error.length > 0) {
                throw new Error(data.error);
            }
            console.log(data);
            Cookies.set('employee_session_token', data.employee_session_token);
            window.location.reload(false);
        }).catch(error => {
            console.error(error);
            showNotification({ icon: <ExclamationMark />, title: "Anmelden fehlgeschlagen", message: "Nutzername oder Passwort nicht korrekt", color: "red", autoClose: 15000 });
        });
    };

    useEffect(() => {
        document.title = "Bürgerbüro - Admin Login";
    });

    return (
        <PageContainer>
            <Text size="xl" weight={700} align="center">Diese Seite kann nur von einem Mitarbeiter aufgerufen werden</Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid grow gutter="xl" align="center">
                    <Grid.Col span={12}>
                        <TextInput type="text" name="username" label="Nutzername" {...form.getInputProps('username')} autoComplete="username" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput type="password" name="password" label="Passwort" {...form.getInputProps('password')} autoComplete="current-password" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button fullWidth type="submit">Jetzt Anmelden</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </PageContainer>
    );
};
