import React, { useState } from "react";
import { useForm } from '@mantine/form';
import { Modal, Grid, Button, Textarea, Select } from "@mantine/core";

export const NewLicenseModal = (props) => {

    const [value, setValue] = useState('');

    const form = useForm({
        initialValues: {
            description: '', type: ''
        },
        validate: {
            type: (value) => (value.length > 0 ? null : 'Bitte eine Genehmigungsart auswählen')
        }
    });

    const handleSubmit = (values) => {
        form.clearErrors();
        form.validate();
        console.log(values);
    };

    return (
        <Modal opened={props.opened} onClose={() => props.setOpen(false)} title="Neue Genehmigung beantragen" size="lg">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid grow gutter="xl" align="center">
                    <Grid.Col span={12}>
                        <Select value={value} onChange={setValue} label="Genehmigungstyp" placeholder="Bitte auswählen" {...form.getInputProps('type')} data={props.permits} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea label="Antragsbeschreibung" minRows={6} placeholder="Beschreibe kurz wofür diese Genehmigung gebraucht wird" {...form.getInputProps('description')} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button fullWidth type="submit">Beantragen</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Modal>
    );
}