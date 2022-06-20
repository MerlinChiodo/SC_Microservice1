import React, { useEffect, useState } from "react";
import { Table, ScrollArea, createStyles, Badge, Button, Grid } from '@mantine/core';
import { PageContainer } from "../components/PageContainer";
import { NewLicenseModal } from "../components/NewLicenseModal";
import { Plus, Refresh } from "tabler-icons-react";
import { SmartAuth } from "../util/SmartAuth";

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.dark[7],
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""', position: 'absolute', left: 0, right: 0, bottom: 0, borderBottom: `1px solid ${theme.colors.dark[3]}`,
    },
  },
  scrolled: { boxShadow: theme.shadows.sm, }
}));


//formats a given datestring to the format dd.mm.yyyy or `-` if date is null
const formatDate = (date) => {
  if (date == null) { return "-"; }
  return new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const Licenses = () => {

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [opened, setOpened] = useState(false);
  const [userPermits, setUserPermits] = useState([]);
  const [permits, setPermits] = useState([]);

  const fetchData = () => {
    let citizenID = SmartAuth.getCitizenID();
    if (citizenID == null) { return; }
    fetch(`/api/citizen/${citizenID}/permits`)
      .then(response => response.json())
      .then(data => {
        if (data.errors) { console.error(data.errors); return; }
        setUserPermits(data.permits)
      })
      .catch(error => console.error(error));

    fetch('/api/permits')
      .then(response => response.json())
      .then((data) => {
        if (data.errors) { console.error(data.errors); return; }
        const permits = [{ value: '', label: 'Bitte auswählen' }];
        data.permits.forEach((permit) => { permits.push({ value: '' + permit.permit_id, label: '' + permit.title }); });
        setPermits(permits)
      })
      .catch(error => console.error(error));
  };

  const getBagde = (status) => {
    switch (status) {
      case "gültig":
        return (<Badge color="green" size="lg">{status}</Badge>);
      case "abgelaufen":
      case "abgelehnt":
        return (<Badge color="red" size="lg">{status}</Badge>);
      default:
        return (<Badge color="yellow" size="lg">{status}</Badge>);
    }
  }

  useEffect(() => {
    document.title = "Bürgerbüro - Genehmigungen";
    fetchData();
  }, []);

  return (
    <>
      <NewLicenseModal setOpen={setOpened} opened={opened} permits={permits} refresh={fetchData} />
      <PageContainer title="Meine Genehmigungen" size={1200}>
        <Grid gutter="lg">
          <Grid.Col span={12} sm={6}>
            <Button fullWidth color="green" leftIcon={<Plus size={18} />} onClick={() => setOpened(true)}>Neue Genehmigung beantragen</Button>
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <Button fullWidth color="green" leftIcon={<Refresh size={18} />} onClick={fetchData}>Aktualisieren</Button>
          </Grid.Col>
        </Grid>
        <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} mt={20}>
          <Table sx={{ minWidth: 700 }} highlightOnHover>
            <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <tr>
                <th>Name</th>
                <th>Ausgestellt am</th>
                <th>Gültig bis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userPermits.map(permit => (
                <tr>
                  <td>{permit.title}</td>
                  <td>{formatDate(permit.date_of_issue)}</td>
                  <td>{formatDate(permit.valid_until)}</td>
                  <td>{getBagde(permit.status)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </PageContainer>
    </>
  );
};
