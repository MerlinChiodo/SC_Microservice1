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
    setTimeout(() => {
      updateNotification({ id: 'aboutuschange', title: 'Erfolgreich', message: 'Die Daten wurden aktualisiert', icon: <Check />, loading: false });
      setTimeout(() => {
        updateNotification({ id: 'aboutuschange', title: 'Fehler', message: 'Die Daten konnten nicht aktualisiert werden', icon: <ExclamationMark />, loading: false, color: "red" });
      }, 2000);
    }, 2000);
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
              <TextInput label="Link zur Landingpage" required placeholder="https://www.example.com" type="url" {...form.getInputProps('link')} icon={<Link size={18} />} />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Url zum Bild" placeholder="https://www.example.com/image.jpg" type="url" {...form.getInputProps('image')} icon={<CameraPlus size={18} />} />
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
