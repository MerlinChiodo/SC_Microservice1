import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { PageContainer } from "../components/PageContainer";
import { Text, Button, TextInput, Grid } from "@mantine/core";
import { useForm } from '@mantine/form';

export const AdminLogin = (props) => {

    const { redirect } = props;

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
        const url = `http://auth.smartcityproject.net:8080/employee/login`;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'x-www-form-urlencoded', 'Accept': 'application/json' },
            body: encodeURIComponent('username') + '=' + encodeURIComponent(values.username) + '&' + encodeURIComponent('password') + '=' + encodeURIComponent(values.password)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        }).then(data => {
            console.log(data);
            Cookies.set('employee_session_token', data.employee_session_token);
        }).catch(error => {
            console.error(error);
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
