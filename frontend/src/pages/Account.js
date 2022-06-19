import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContainer";
import { Grid, Text, Button } from "@mantine/core";
import { useModals } from '@mantine/modals';
import { SmartAuth } from '../util/SmartAuth';

export const Account = () => {

  const [currentUser, setUser] = useState({ address: {} });
  const modals = useModals();

  const handleSubmitNameChange = (event, id) => {
    event.preventDefault();
    modals.closeModal(id);
  };

  const handleSubmitAddressChange = (event, id) => {
    event.preventDefault();
    modals.closeModal(id);
  };

  const nameChangeModal = () => modals.openContextModal('nameChange', {
    title: 'Namensänderung', size: 'lg',
    innerProps: { handleSubmit: handleSubmitNameChange }
  });

  const addressChangeModal = () => modals.openContextModal('addressChange', {
    title: 'Adressänderung', size: 'xl',
    innerProps: { handleSubmit: handleSubmitAddressChange }
  });

  const formatDate = (date) => {
    if (date == null) { return "-"; }
    return new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  useEffect(() => {
    document.title = "Bürgerbüro - Meine Daten";
    SmartAuth.loadData().then(() => {
      setUser(SmartAuth.getUser());
    });
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
