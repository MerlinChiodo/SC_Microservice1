import { useState, useEffect } from "react";
import { PageContainer } from "../../components/PageContainer";
import { Grid, Button, ScrollArea, Table, createStyles } from "@mantine/core";
import { Refresh } from "tabler-icons-react";

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
                            <tr>
                                <td>{request.citizen_old.lastname}, {request.citizen_old.firstname}</td>
                                <td>{request.opened ? new Date(request.opened).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "-"}</td>
                                <td style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="outline" size="xs">Details</Button>
                                </td>
                            </tr>))}
                    </tbody>
                </Table>
            </ScrollArea>
        </PageContainer>
    );
}