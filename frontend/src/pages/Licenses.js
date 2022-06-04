import React, { useEffect, useState } from "react";
import { Paper, Title, Container, Table, ScrollArea, createStyles, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.dark[7],
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colors.dark[3]}`,
    },
  },

  scrolled: { boxShadow: theme.shadows.sm, }
}));

export const Licenses = () => {

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [rows, setRows] = useState([]);

  const fetchData = () => {
    fetch('/api/citizen/1/permits')
      .then(response => response.json())
      .then(data => setRows(data.permits))
      .catch(error => console.error(error));
  };

  //formats a given datestring to the format dd.mm.yyyy or `-` if date is null
  const formatDate = (date) => {
    if (date == null) {
      return "-";
    }
    return new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
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

  return (
    <Container size={1200} my={40}>
      <Title align="center" order={1} sx={() => ({ fontWeight: 900 })} >
        Meine Genehmigungen.
      </Title>

      <Paper withBorder shadow="md" p={30} mt="lg" radius="md" sx={(theme) => ({ backgroundColor: theme.colors.dark[7] })}>
        <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
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
              {rows.map(permit => (
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
      </Paper>
    </Container >
  );
};
