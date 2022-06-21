import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContainer";
import { showNotification, updateNotification } from '@mantine/notifications';
import { Grid, Text, Button } from "@mantine/core";
import { useModals } from '@mantine/modals';
import { SmartAuth } from '../util/SmartAuth';
import { Check, ExclamationMark } from "tabler-icons-react";

export const Account = () => {

  const [currentUser, setUser] = useState({ address: {} });
  const modals = useModals();

  const handleSubmit = (event, id, type) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    formData.citizen_id = SmartAuth.getCitizenID();
    console.log(type, formData);
    showNotification({ id: 'datachange', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
    fetch('/api/requests', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(data => {
        if (data.errors) { throw data.errors; }
        if (data.request && data.request.request_id > 0) {
          updateNotification({ id: 'datachange', title: 'Erfolgreich', message: 'Der Antrag wurde erfolgreich eingereicht', icon: <Check />, loading: false });
          modals.closeModal(id);
        }
      })
      .catch(error => {
        updateNotification({ id: 'datachange', title: 'Fehler', message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut', icon: <ExclamationMark />, loading: false, color: 'red' });
        console.error(error)
      });
  };

  const nameChangeModal = () => modals.openContextModal('nameChange', { title: 'Namensänderung', size: 'lg', innerProps: { handleSubmit: handleSubmit } });
  const addressChangeModal = () => modals.openContextModal('addressChange', { title: 'Adressänderung', size: 'xl', innerProps: { handleSubmit: handleSubmit } });

  const formatDate = (date) => {
    if (date == null) { return "-"; }
    return new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  useEffect(() => {
    document.title = "Bürgerbüro - Meine Daten";
    setUser(SmartAuth.getCitizen());
  }, []);

  return (
    <PageContainer title="Meine Daten" size={1000}>
      <Grid gutter="lg">
        <Grid.Col span={12}>
          <Text size="lg" weight={800}>Name</Text>
          <Text>{currentUser.firstname} {currentUser.lastname}{currentUser.birthname ? (" (geb. " + currentUser.birthname + ")") : ""}</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>Geburtsdatum</Text>
          <Text>{formatDate(currentUser.birthdate)}</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>Geburtsort</Text>
          <Text>{currentUser.place_of_birth}</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>E-Mail</Text>
          <Text>{currentUser.email}</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>Adresse</Text>
          <Text>{currentUser.address.street} {currentUser.address.housenumber}</Text>
          <Text>{currentUser.address.city_code} {currentUser.address.city}</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Button fullWidth color="green" onClick={nameChangeModal}>Namensänderung beantragen</Button>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Button fullWidth color="green" onClick={addressChangeModal}>Umzug melden</Button>
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
};
