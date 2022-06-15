import React, { useEffect, useState } from "react";
import { createStyles } from "@mantine/core";
import { PageContainer } from "../../components/PageContainer";
import { Grid, Button, ScrollArea, Table } from "@mantine/core";
import { showNotification, updateNotification } from '@mantine/notifications';
import { Refresh, Check, ExclamationMark } from "tabler-icons-react";
import { useModals } from '@mantine/modals';


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
  const modals = useModals();

  const handleAccept = (event, modalID, permits_id) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let valid_until = Object.fromEntries(formData).valid_until || null;
    if (valid_until !== null) {
      valid_until = new Date(valid_until + "T12:00:00.000Z").toISOString().split('T')[0];
    }
    modals.closeModal(modalID);
    showNotification({ id: 'accept', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
    fetch(`/api/permits/approve/${permits_id}`, {
      method: 'POST',
      body: JSON.stringify({ valid_until: valid_until }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => {
        if (data.errors) { throw data.errors; }
        if (data.success) {
          updateNotification({ id: 'accept', title: 'Erfolgreich', message: 'Du hast die Genehmigung angenommen', icon: <Check />, loading: false });
          fetchData();
        }
      })
      .catch(error => {
        updateNotification({ id: 'accept', title: 'Fehler', message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut', icon: <ExclamationMark />, loading: false, color: 'red' });
        console.error(error)
      });
  };

  const handleDecline = (modalID, permits_id) => {
    modals.closeModal(modalID);
    showNotification({ id: 'reject', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
    fetch(`/api/permits/reject/${permits_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => {
        if (data.errors) { throw data.errors; }
        if (data.success) {
          updateNotification({ id: 'reject', title: 'Erfolgreich', message: 'Du hast die Genehmigung abgelehnt', icon: <Check />, loading: false });
          fetchData();
        }
      })
      .catch(error => {
        updateNotification({ id: 'reject', title: 'Fehler', message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut', icon: <ExclamationMark />, loading: false, color: 'red' });
        console.error(error)
      });
  }

  const detailsModal = (permit) => modals.openContextModal('acceptLicense', {
    title: 'Genehmigungsdetails', size: 'lg',
    innerProps: {
      handleDecline: handleDecline,
      handleAccept: handleAccept,
      permit: permit,
    }
  });

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
        <Grid.Col>
          <Button fullWidth color="green" leftIcon={<Refresh size={18} />} onClick={fetchData}>Aktualisieren</Button>
        </Grid.Col>
      </Grid>
      <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} mt={20}>
        <Table sx={{ minWidth: 700 }} highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr><th>Bürger</th><th>Genehmigungsart</th><th></th></tr>
          </thead>
          <tbody>
            {permits.map(permit => (
              <tr>
                <td>{permit.lastname}, {permit.firstname}</td>
                <td>{permit.title}</td>
                <td style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="outline" size="xs" onClick={() => detailsModal(permit)}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </PageContainer>
  );
};
