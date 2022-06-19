import React, { useEffect } from "react";
import { PageContainer } from "../components/PageContainer";
import { Grid, Text, Button } from "@mantine/core";

export const Account = () => {

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
          <Button fullWidth color="teal">Namensänderung beantragen</Button>
        </Grid.Col>
        <Grid.Col span={12} xs={6}>
          <Button fullWidth color="teal" >Umzug melden</Button>
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
};
