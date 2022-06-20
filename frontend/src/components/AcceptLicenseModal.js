import { Grid, Text, Button } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { Calendar } from "tabler-icons-react";

export const AcceptLicenseModal = ({ context, id, innerProps }) => (
    <form onSubmit={(event) => innerProps.handleAccept(event, id, innerProps.permit.permits_id)}>
        <Grid grow gutter="xl" align="center">
            <Grid.Col span={12}>
                <Text size="lg" weight={800}>Bürger</Text>
                <Text>{innerProps.permit.lastname}, {innerProps.permit.firstname}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <Text size="lg" weight={800}>Genehmigungsart</Text>
                <Text>{innerProps.permit.title}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <Text size="lg" weight={800}>Genehmigungsdetails</Text>
                <Text>{innerProps.permit.description}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <Text size="lg" weight={800}>Begründung des Bürgers</Text>
                <Text>{innerProps.permit.reason}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <Text size="lg" weight={800}>Gültig bis</Text>
                <DatePicker icon={<Calendar size={16} />} placeholder="optional" label="" name="valid_until" inputFormat="YYYY-MM-DD" />
            </Grid.Col>
            <Grid.Col span={6}>
                <Button fullWidth color="red" onClick={() => innerProps.handleDecline(id, innerProps.permit.permits_id)}>Ablehnen</Button>
            </Grid.Col>
            <Grid.Col span={6}>
                <Button fullWidth color="green" type="submit">Annehmen</Button>
            </Grid.Col>
        </Grid>
    </form>
);