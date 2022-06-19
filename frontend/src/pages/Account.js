import React, { useEffect } from "react";
import { PageContainer } from "../components/PageContainer";
import { Grid, Text, Button } from "@mantine/core";
import { useModals } from '@mantine/modals';

export const Account = () => {

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
    title: 'Adressänderung', size: 'lg',
    innerProps: { handleSubmit: handleSubmitAddressChange }
  });

  useEffect(() => {
    document.title = "Bürgerbüro - Meine Daten";
  }, []);

  return (
    <PageContainer title="Meine Daten" size={1000}>
      <Grid gutter="lg">
        <Grid.Col span={12}>
          <Text size="lg" weight={800}>Name</Text>
          <Text>Max Mustermann (geb. Muster)</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>Geburtsdatum</Text>
          <Text>01.01.2000</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>Geburtsort</Text>
          <Text>Musterstadt</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>E-Mail</Text>
          <Text>max@mustermann.de</Text>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Text size="lg" weight={800}>Adresse</Text>
          <Text>Musterstraße 1</Text>
          <Text>12345 Musterhausen</Text>
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
