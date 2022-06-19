import { Grid, TextInput, Button, Textarea } from "@mantine/core";

export const NameChangeModal = ({ context, id, innerProps }) => (
    <form onSubmit={(event) => innerProps.handleSubmit(event, id, "Namensänderung")}>
        <Grid grow gutter="xl" align="center">
            <Grid.Col span={12}>
                <TextInput label="Vorname" name="firstname" placeholder="Bitte eingeben" required />
            </Grid.Col>
            <Grid.Col span={12}>
                <TextInput label="Nachname" name="lastname" placeholder="Bitte eingeben" required />
            </Grid.Col>
            <Grid.Col span={12}>
                <Textarea label="Begründung" name="reason" minRows={7} placeholder="Bitte beschreibe warum die Namensänderung beantragt wird" />
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
                <Button fullWidth color="red" onClick={() => context.closeModal(id)}>Abbrechen</Button>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
                <Button fullWidth color="green" type="submit">Änderung beantragen</Button>
            </Grid.Col>
        </Grid>
    </form>
);