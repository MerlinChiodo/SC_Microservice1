import React, { useEffect, useState, useRef } from "react";
import { useForm } from '@mantine/form';
import { Modal, Grid, Button, Textarea, Select, createStyles, Text, useMantineTheme } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Check, ExclamationMark } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    wrapper: { position: 'relative', marginBottom: 40, },
    dropzone: { borderWidth: 1, padding:0, paddingBottom: 25, },
    control: { position: 'absolute', width: 250, left: 'calc(50% - 125px)', bottom: -20, },
}));

function getActiveColor(status, theme) {
    return status.accepted ? theme.colors[theme.primaryColor][6] : status.rejected ? theme.colors.red[6] : theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black;
}

export const NewLicenseModal = (props) => {

    const [value, setValue] = useState('');
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const openRef = useRef();

    const form = useForm({
        initialValues: {
            description: '', permit_id: ''
        },
        validate: {
            permit_id: (value) => (value.length > 0 ? null : 'Bitte eine Genehmigungsart auswählen')
        }
    });

    const handleSubmit = (values) => {
        form.clearErrors();
        form.validate();
        showNotification({ id: 'request-license', title: 'Bitte warten', message: 'Deine Anfrage wird bearbeitet', loading: true });
        console.log(values);
        fetch('/api/permits/requestPermit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(values)
        }).then(async (response) => {
            if (response.ok) {
                let result = await response.json();
                if (result.success === true) {
                    updateNotification({ id: 'request-license', title: 'Erfolgreich', message: 'Deine Anfrage wurde erfolgreich übermittelt', icon: <Check />, loading: false });
                    form.reset();
                    props.setOpen(false);
                    props.refresh();
                } else {
                    updateNotification({ id: 'request-license', title: 'Fehler', message: 'Es ist ein unbekannter Fehler aufgetreten', icon: <ExclamationMark />, loading: false, color: 'red' });
                }
            } else if (response.status === 400) {
                updateNotification({ id: 'request-license', title: 'Fehler', message: 'Bitte überprüfen Sie Ihre Eingaben', icon: <ExclamationMark />, loading: false, color: 'red' });
            } else {
                updateNotification({ id: 'request-license', title: 'Fehler', message: 'Es ist ein unbekannter Fehler aufgetreten', icon: <ExclamationMark />, loading: false, color: 'red' });
            }
        }).catch(error => {
            console.error(error);
            updateNotification({ id: 'request-license', title: 'Fehler', message: 'Es ist ein unbekannter Fehler aufgetreten', icon: <ExclamationMark />, loading: false, color: 'red' });
        });
    };

    useEffect(() => {
        form.setFieldValue('citizen_id', 1);
    });

    return (
        <Modal opened={props.opened} onClose={() => props.setOpen(false)} title="Neue Genehmigung beantragen" size="lg">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid grow gutter="xl" align="center">
                    <Grid.Col span={12}>
                        <Select value={value} onChange={setValue} label="Genehmigungstyp" placeholder="Bitte auswählen" {...form.getInputProps('permit_id')} data={props.permits} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea label="Antragsbeschreibung" minRows={6} placeholder="Beschreibe kurz wofür diese Genehmigung gebraucht wird" {...form.getInputProps('description')} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <div className={classes.wrapper}>
                            <Dropzone
                                onReject={(files) => console.log('rejected files', files)}
                                onDrop={(files) => console.log('accepted files', files)}
                                openRef={openRef} className={classes.dropzone} radius="md" accept={[MIME_TYPES.pdf]} maxSize={5 * 1024 ** 2}
                            >
                                {(status) => (
                                    <div style={{ pointerEvents: 'none' }}>
                                        <Text align="center" weight={700} size="lg" mt="xl" sx={{ color: getActiveColor(status, theme) }} >
                                            {status.accepted ? 'Dateien hier ablegen' : status.rejected ? 'Pdf-Dateien kleiner als 5mb' : 'Dateien anhängen'}
                                        </Text>
                                        <Text align="center" size="sm" mt="xs" color="dimmed">
                                            Dateien hierher verschieben um sie dem Antrag anzuhängen.
                                            <br />
                                            Es sind nur <i>.pdf</i> Dateien die kleiner als 5mb sind erlaubt.
                                        </Text>
                                    </div>
                                )}
                            </Dropzone>
                            <Button className={classes.control} size="sm" radius="lg" onClick={() => openRef.current()}>Dateien auswählen</Button>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button fullWidth type="submit">Beantragen</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Modal>
    );
}