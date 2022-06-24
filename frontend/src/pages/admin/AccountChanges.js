import { useState, useEffect } from "react";
import { PageContainer } from "../../components/PageContainer";
import { Grid, Button, ScrollArea, Table, createStyles } from "@mantine/core";
import { showNotification, updateNotification } from '@mantine/notifications';
import { Check, ExclamationMark, Refresh } from "tabler-icons-react";
import { useModals } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky', top: 0,
        backgroundColor: theme.colors.dark[7],
        transition: 'box-shadow 150ms ease',
        '&::after': { content: '""', position: 'absolute', left: 0, right: 0, bottom: 0, borderBottom: `1px solid ${theme.colors.dark[3]}`, },
    },
    scrolled: { boxShadow: theme.shadows.sm, }
}));

export const AccountChanges = () => {

    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [requests, setRequests] = useState([]);
    const modals = useModals();

    const handleAccept = (event, modal_id, request_id) => {
        event.preventDefault();
        showNotification({ id: 'datachange1', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
        fetch(`/api/requests/approve/${request_id}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.errors) { throw data.errors; }
                if (data.success && data.success === true) {
                    updateNotification({ id: 'datachange1', title: 'Erfolgreich', message: 'Die Accountdaten wurden geändert', icon: <Check />, loading: false });
                    modals.closeModal(modal_id);
                    fetchData();
                }
            })
            .catch(error => {
                console.error(error);
                updateNotification({ id: 'datachange1', title: 'Fehler', message: 'Die Accountdaten konnten nicht geändert werden', icon: <ExclamationMark />, loading: false, color: 'red' });
            });
    };

    const handleDecline = (modal_id, request_id) => {
        showNotification({ id: 'datachange2', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
        fetch(`/api/requests/reject/${request_id}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.errors) { throw data.errors; }
                if (data.success && data.success === true) {
                    updateNotification({ id: 'datachange2', title: 'Erfolgreich', message: 'Die Änderung der Accountdaten wurde abgelehnt', icon: <Check />, loading: false });
                    modals.closeModal(modal_id);
                    fetchData();
                }
            })
            .catch(error => {
                console.error(error);
                updateNotification({ id: 'datachange2', title: 'Fehler', message: 'Die Änderung der Accountdaten konnte nicht abgelehnt werden', icon: <ExclamationMark />, loading: false, color: 'red' });
            });
    };

    const detailsModal = (request) => modals.openContextModal('acceptRequest', {
        title: 'Antragsdetails', size: 'xl',
        innerProps: { handleAccept: handleAccept, handleDecline: handleDecline, request: request }
    });

    const fetchData = () => {
        fetch('/api/requests')
            .then(response => response.json())
            .then(data => {
                if (data.errors) { throw data.errors; }
                if (data.requests) { console.log(data); setRequests(data.requests); }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        document.title = "Bürgerbüro - Accountänderungen";
        fetchData();
    }, []);

    return (
        <PageContainer title="Offene Anträge zur Änderung der Daten" size={1200}>
            <Grid gutter="lg">
                <Grid.Col>
                    <Button fullWidth color="green" leftIcon={<Refresh size={18} />} onClick={fetchData}>Aktualisieren</Button>
                </Grid.Col>
            </Grid>
            <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} mt={20}>
                <Table sx={{ minWidth: 700 }} highlightOnHover>
                    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <tr><th>Antragssteller</th><th>Antragsdatum</th><th></th></tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.request_id}>
                                <td>{request.citizen_old.lastname}, {request.citizen_old.firstname}</td>
                                <td>{request.opened ? new Date(request.opened).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "-"}</td>
                                <td style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outline" size="xs" onClick={() => detailsModal(request)}>Details</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </PageContainer>
    );
}