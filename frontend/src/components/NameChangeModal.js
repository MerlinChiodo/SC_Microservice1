import { Grid, Text, Button } from "@mantine/core";

export const NameChangeModal = ({ context, id, innerProps }) => (
    <form onSubmit={(event) => innerProps.handleSubmit(event, id)}>
        <Grid grow gutter="xl" align="center">
            <Grid.Col span={12}>
                <Text size="lg" weight={800}>Test</Text>
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