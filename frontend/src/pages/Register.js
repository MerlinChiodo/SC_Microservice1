import React, { useEffect } from "react";
import { TextInput, Paper, Title, Container, Group, Button, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Calendar } from 'tabler-icons-react';

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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <div>
      <Container size={1000} my={40}>
        <Title
          align="center" order={1}
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900, color: theme.colors.gray[3] })} >
          In der SmartCity melden.
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" sx={(theme) => ({ backgroundColor: theme.colors.gray[9] })}>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Group spacing="xs" grow>
              <TextInput label="Vorname" placeholder="Max" required mt="md" {...form.getInputProps('firstname')} />
              <TextInput label="Nachname" placeholder="Mustermann" required mt="md" {...form.getInputProps('lastname')} />
              <Select label="Geschlecht" placeholder="Bitte auswählen" required mt="md" {...form.getInputProps('gender')}
                data={[
                  { value: 'm', label: 'Männlich' },
                  { value: 'w', label: 'Weiblich' },
                  { value: 'd', label: 'Divers' }
                ]}
              />
            </Group>
            <Group spacing="xs" grow>
              <DatePicker icon={<Calendar size={16} />} placeholder="Bitte auswählen" label="Geburtsdatum" mt="md" required {...form.getInputProps('birthdate')} />
              <TextInput label="Geburtsort" placeholder="" mt="md" {...form.getInputProps('place_of_birth')} />
              <TextInput label="Geburtsname" placeholder="" mt="md" {...form.getInputProps('birthname')} />
            </Group>
            <Group spacing="xs" grow>
              <TextInput label="E-Mail" type="email" placeholder="max@mustermann.de" required mt="md" {...form.getInputProps('email')} />
            </Group>
            <Group spacing="xs" grow>
              <TextInput label="Straße" placeholder="Musterweg" required mt="md" {...form.getInputProps('street')} />
              <TextInput label="Hausnummer" placeholder="1a" required mt="md" {...form.getInputProps('housenumber')} />
            </Group>
            <Group spacing="xs" grow>
              <TextInput label="Postleitzahl" type="number" placeholder="12345" required mt="md" {...form.getInputProps('city_code')} />
              <TextInput label="Ort" placeholder="Musterhausen" required mt="md" {...form.getInputProps('city')} />
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Jetzt melden
            </Button>
          </form>
        </Paper>
      </Container >
    </div >
  );
};
