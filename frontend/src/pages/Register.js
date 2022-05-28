import React, { useEffect } from "react";
import { TextInput, Paper, Title, Container, Button, Select, NumberInput, Grid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Calendar, Check, ExclamationMark } from 'tabler-icons-react';
import { showNotification, updateNotification } from '@mantine/notifications';

export const Register = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Melden";
  }, []);

  const form = useForm({
    initialValues: {
      firstname: '', lastname: '', email: '', birthname: '', birthdate: '', place_of_birth: '',
      gender: '', street: '', housenumber: '', city_code: '', city: ''
    },
    validate: {
      firstname: (value) => (value.length > 0 ? null : 'Bitte geben Sie Ihren Vornamen ein'),
      lastname: (value) => (value.length > 0 ? null : 'Bitte geben Sie Ihren Nachnamen ein'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Bitte geben Sie eine gültige E-Mail-Adresse ein'),
      birthdate: (value) => {
        let date = new Date(value);
        return ((date > 0) ? null : 'Bitte geben Sie ein gültiges Geburtsdatum ein');
      },
      gender: (value) => {
        let possibleValues = ['m', 'w', 'd'];
        return (possibleValues.includes(value) ? null : 'Bitte wählen Sie ein Geschlecht aus');
      },
      street: (values) => (values.length > 0 ? null : 'Bitte geben Sie Ihre Straße ein'),
      housenumber: (value) => (value.length > 0 ? null : 'Bitte geben Sie Ihre Hausnummer ein'),
      city_code: (value) => {
        if (isNaN(value)) {
          return 'Bitte geben Sie eine gültige Postleitzahl ein';
        }
        return parseInt(value) > 0 ? null : 'Bitte geben Sie eine gültige Postleitzahl ein';
      },
      city: (value) => (value.length > 0 ? null : 'Bitte geben Sie Ihre Stadt ein')
    }
  });

  const handleSubmit = (values) => {
    form.clearErrors();
    form.validate();
    showNotification({ id: 'register', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
    console.log(values);
    fetch('/api/citizen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(values)
    }).then(response => {
      if (response.ok) {
        console.log(response.body);
        updateNotification({
          id: 'register', title: 'Erfolgreich', message: 'Du bist nun in der SmartCity gemeldet',
          icon: <Check />, loading: false
        });
        // form.reset();
      } else if (response.status === 400) {
        updateNotification({
          id: 'register', title: 'Fehler', message: 'Bitte überprüfen Sie Ihre Eingaben',
          icon: <ExclamationMark />, loading: false, color: 'red'
        });
      } else if (response.status === 500) {
        updateNotification({
          id: 'register', title: 'Fehler', message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut',
          icon: <ExclamationMark />, loading: false, color: 'red'
        });
      } else {
        updateNotification({
          id: 'register', title: 'Fehler', message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut',
          icon: <ExclamationMark />, loading: false, color: 'red'
        });
      }
    }).catch(error => {
      console.error(error);
      updateNotification({
        id: 'register', title: 'Fehler', message: 'Es ist ein Fehler aufgetreten',
        icon: <ExclamationMark />, loading: false, color: 'red'
      });
    });
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
              <TextInput label="Vorname" placeholder="Max" {...form.getInputProps('firstname')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Nachname" placeholder="Mustermann" {...form.getInputProps('lastname')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <Select label="Geschlecht" placeholder="Bitte auswählen" {...form.getInputProps('gender')}
                data={[{ value: 'm', label: 'Männlich' }, { value: 'w', label: 'Weiblich' }, { value: 'd', label: 'Divers' }]}
              />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <DatePicker icon={<Calendar size={16} />} placeholder="Bitte auswählen" label="Geburtsdatum" {...form.getInputProps('birthdate')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Geburtsort" placeholder="" {...form.getInputProps('place_of_birth')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Geburtsname" placeholder="" {...form.getInputProps('birthname')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="E-Mail" type="email" placeholder="max@mustermann.de" {...form.getInputProps('email')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Straße" placeholder="Musterweg" {...form.getInputProps('street')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Hausnummer" placeholder="1a" {...form.getInputProps('housenumber')} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <NumberInput label="Postleitzahl" placeholder="12345" hideControls {...form.getInputProps('city_code')} min={0} max={99999} step={1} />
            </Grid.Col>
            <Grid.Col md={4} sm={6}>
              <TextInput label="Ort" placeholder="Musterhausen" {...form.getInputProps('city')} />
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
