import React, { useEffect } from "react";
import { TextInput, Paper, Title, Container, Button, Grid, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { Link, CameraPlus, Check, ExclamationMark } from "tabler-icons-react";

export const AdminPage = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Admin";
  }, []);

  const form = useForm({
    initialValues: {
      aboutus: '', link: '', image: ''
    }
  });

  const handleSubmit = (values) => {
    form.clearErrors();
    form.validate();
    showNotification({ id: 'aboutuschange', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
    console.log(values);
    fetch('/api/admin/aboutus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(values)
    }).then(async (response) => {
      if (response.ok) {
        let result = await response.json();
        if (result.aboutus_changed === true) {
          updateNotification({ id: 'aboutuschange', title: 'Erfolgreich', message: 'Die Änderungen wurden gespeichert', icon: <Check />, loading: false });
          form.reset();
        } else {
          updateNotification({ id: 'aboutuschange', title: 'Fehler', message: 'Es ist ein unbekannter Fehler aufgetreten', icon: <ExclamationMark />, loading: false, color: 'red' });
        }
      } else if (response.status === 400) {
        updateNotification({ id: 'aboutuschange', title: 'Fehler', message: 'Bitte überprüfe deine Eingaben', icon: <ExclamationMark />, loading: false, color: 'red' });
      } else {
        updateNotification({ id: 'aboutuschange', title: 'Fehler', message: 'Es ist ein unbekannter Fehler aufgetreten', icon: <ExclamationMark />, loading: false, color: 'red' });
      }
    }).catch(() => {
      updateNotification({ id: 'aboutuschange', title: 'Fehler', message: 'Es ist ein unbekannter Fehler aufgetreten', icon: <ExclamationMark />, loading: false, color: 'red' });
    });
  };

  return (
    <Container size={1000} my={40}>
      <Title align="center" order={1} sx={() => ({ fontWeight: 900 })} >
        Eintrag auf der Landingpage aktualisieren
      </Title>
      <Paper withBorder shadow="md" p={30} mt="lg" radius="md" sx={(theme) => ({ backgroundColor: theme.colors.dark[7] })}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid grow gutter="xl" align="center">
            <Grid.Col span={12}>
              <Textarea label="Kurzbeschreibung" minRows={6} placeholder="Dieser Text wird auf der Landingpage angezeigt" {...form.getInputProps('aboutus')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Link zur Landingpage" required placeholder="https://www.example.com" type="url" {...form.getInputProps('link')} icon={<Link size={18} />} description="zum Beispiel: http://vps2290194.fastwebserver.de:9710/" />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Url zum Bild" placeholder="https://www.example.com/image.jpg" type="url" {...form.getInputProps('image')} icon={<CameraPlus size={18} />} description="zu Beispiel: https://raw.githubusercontent.com/SmartCityProjectGroup/SmartCity/main/Logo_4.png" />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button fullWidth mt="lg" type="submit">
                Absenden
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
