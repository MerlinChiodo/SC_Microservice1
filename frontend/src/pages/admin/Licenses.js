import React, { useEffect, useState } from "react";
import { createStyles } from "@mantine/core";
import { PageContainer } from "../../components/PageContainer";
import { Grid, Button, ScrollArea, Table } from "@mantine/core";
import { Refresh } from "tabler-icons-react";


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

export const AdminLicenses = () => {

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [permits, setPermits] = useState([]);

  const fetchData = () => {
    fetch('/api/permits/open')
      .then(response => response.json())
      .then((data) => {
        if (data.errors) { console.error(data.errors); return; }
        setPermits(data.requests);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    document.title = "Bürgerbüro - Genehmigungen";
    setTimeout(fetchData, 500);
  }, []);

  return (
    <PageContainer title="Offene Genehmigungen" size={1200}>
      <Grid gutter="lg">
        <Grid.Col span={12}>
          <Button fullWidth color="green" leftIcon={<Refresh size={18} />} onClick={fetchData}>Aktualisieren</Button>
        </Grid.Col>
      </Grid>
      <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} mt={20}>
        <Table sx={{ minWidth: 700 }} highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th>Bürger</th>
              <th>Genehmigungsart</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {permits.map(permit => (
              <tr>
                <td>{permit.lastname}, {permit.firstname}</td>
                <td>{permit.title}</td>
              <td style={{ display:"flex", justifyContent:"flex-end" }}><Button variant="outline" size="xs">Details</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </PageContainer>
  );
};
