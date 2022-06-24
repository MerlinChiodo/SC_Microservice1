import { Grid, TextInput, Button, NumberInput, Textarea } from "@mantine/core";

export const AddressChangeModal = ({ context, id, innerProps }) => (
    <form onSubmit={(event) => innerProps.handleSubmit(event, id, "Adressänderung")}>
        <Grid grow gutter="xl" align="center">
            <Grid.Col span={12} xs={8}>
                <TextInput label="Straße" name="street" placeholder="Bitte eingeben" required />
            </Grid.Col>
            <Grid.Col span={12} xs={4}>
                <TextInput label="Hausnummer" name="housenumber" placeholder="Bitte eingeben" required />
            </Grid.Col>
            <Grid.Col span={12} xs={4}>
                <NumberInput label="Postleitzahl" name="city_code" placeholder="Bitte eingeben" hideControls required />
            </Grid.Col>
            <Grid.Col span={12} xs={8}>
                <TextInput label="Ort" name="city" placeholder="Bitte eingeben" required />
            </Grid.Col>
            <Grid.Col span={12}>
                <Textarea label="Begründung" name="reason" minRows={7} placeholder="Bitte beschreibe warum die Adressänderung beantragt wird" />
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