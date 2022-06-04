import React, { useEffect, useState } from "react";
import { Table, ScrollArea, createStyles, Badge, Button } from '@mantine/core';
import { PageContainer } from "../components/PageContainer";
import { NewLicenseModal } from "../components/NewLicenseModal";
import { Plus } from "tabler-icons-react";

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
    fetch('/api/citizen/1/permits')
      .then(response => response.json())
      .then(data => setUserPermits(data.permits))
      .catch(error => console.error(error));

    fetch('/api/permits')
      .then(response => response.json())
      .then((data) => {
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
        return (<Badge color="red" size="lg">{status}</Badge>);
      default:
        return (<Badge color="yellow" size="lg">{status}</Badge>);
    }
  }

  useEffect(() => {
    document.title = "Bürgerbüro - Genehmigungen";
    fetchData();
  }, []);

  const openModal = () => {
    setOpened(true);
  };

  return (
    <>
      <NewLicenseModal setOpen={setOpened} opened={opened} permits={permits} />
      <PageContainer title="Meine Genehmigungen" size={1200}>
        <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
          <Table sx={{ minWidth: 700 }} highlightOnHover>
            <caption>
              <Button color="green" leftIcon={<Plus size={18} />} onClick={openModal}>Neue Genehmigung beantragen</Button>
            </caption>
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
