import React from "react"
import { Modal, Grid, Button, Text } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Calendar } from "tabler-icons-react";

export const ApproveModal = (props) => {

    const form = useForm({ initialValues: { valid_until: null } });

    const handleDecline = () => {
        props.setOpen(false);
        form.clearErrors();
    }

    const handleAccept = (values) => {
        form.clearErrors();
        form.validate();
        // props.setOpen(false);
        console.log(values);
    }

    return (
        <Modal opened={props.opened} onClose={() => props.setOpen(false)} title="Genehmigungsdetails" size="lg">
            <form onSubmit={form.onSubmit(handleAccept)}>
                <Grid grow gutter="xl" align="center">
                    <Grid.Col span={12}>
                        <Text size="lg" weight={800}>Bürger</Text>
                        <Text>Nachname, Vorname</Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text size="lg" weight={800}>Genehmigungsart</Text>
                        <Text>Genehmigungsart</Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text size="lg" weight={800}>Genehmigungsdetails</Text>
                        <Text>Genehmigungsdetails</Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text size="lg" weight={800}>Begründung des Bürgers</Text>
                        <Text>Begründung des Bürgers</Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text size="lg" weight={800}>Gültig bis</Text>
                        <DatePicker icon={<Calendar size={16} />} placeholder="optional" {...form.getInputProps('valid_until')} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button fullWidth color="green" type="submit">Annehmen</Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button fullWidth color="red" onClick={handleDecline}>Ablehnen</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Modal>
    );

}