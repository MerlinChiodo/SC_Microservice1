import React, { useEffect } from "react";
import { TextInput, Paper, Title, Container, Button, Select, NumberInput, Grid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Calendar, Check } from 'tabler-icons-react';
import { showNotification, updateNotification } from '@mantine/notifications';

export const Register = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Melden";
  }, []);

  const form = useForm({
    initialValues: {
      firstname: '', lastname: '', email: '', birthname: '', birthdate: '', place_of_birth: '',
      gender: '', street: '', housenumber: '', city_code: '', city: ''
    }
  });

  const handleSubmit = (values) => {
    showNotification({
      id: 'register',
      title: 'Bitte warten',
      message: 'Deine Anfrage wird bearbeitet',
      loading: true
    });
    console.log(values);
    setTimeout(() => {
      updateNotification({
        id: 'register',
        title: 'Erfolgreich',
        message: 'Du bist nun in der SmartCity gemeldet',
        icon: <Check />,
        loading: false
      });
      form.reset();
    }, 2000);
  };


  return (
    <Container size={1000} my={40}>
      <Title align="center" order={1} sx={() => ({ fontWeight: 900 })} >
        In der SmartCity melden.
      </Title>

      <Paper withBorder shadow="md" p={30} mt="lg" radius="md" sx={(theme) => ({ backgroundColor: theme.colors.dark[7] })}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid grow gutter="xl" align="center">
            <Grid.Col md={4} sm={6}>
              <TextInput label="Vorname" placeholder="Max" required {...form.getInputProps('firstname')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Nachname" placeholder="Mustermann" required {...form.getInputProps('lastname')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <Select label="Geschlecht" placeholder="Bitte auswählen" required {...form.getInputProps('gender')}
                data={[{ value: 'm', label: 'Männlich' }, { value: 'w', label: 'Weiblich' }, { value: 'd', label: 'Divers' }]}
              />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <DatePicker icon={<Calendar size={16} />} placeholder="Bitte auswählen" label="Geburtsdatum" required {...form.getInputProps('birthdate')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Geburtsort" placeholder="" {...form.getInputProps('place_of_birth')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Geburtsname" placeholder="" {...form.getInputProps('birthname')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="E-Mail" type="email" placeholder="max@mustermann.de" required {...form.getInputProps('email')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Straße" placeholder="Musterweg" required {...form.getInputProps('street')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Hausnummer" placeholder="1a" required {...form.getInputProps('housenumber')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <NumberInput label="Postleitzahl" placeholder="12345" hideControls required {...form.getInputProps('city_code')} min={0} max={99999} step={1} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Ort" placeholder="Musterhausen" required {...form.getInputProps('city')} />
            </Grid.Col>
            <Grid.Col md={12}>
              <Button fullWidth mt="lg" type="submit">
                Jetzt melden
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
    </Container >
  );
};
