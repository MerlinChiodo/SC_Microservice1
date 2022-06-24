import { Grid, Button, Text } from "@mantine/core";

/*returns {lastname, firstname} as text and colors those values that will be changed */
const getFormattedName = (request) => {
    const firstname_old = request.citizen_old.firstname;
    const lastname_old = request.citizen_old.lastname;
    const firstname_new = request.citizen_new.firstname;
    const lastname_new = request.citizen_new.lastname;
    let lastname, firstname;
    if (firstname_new !== null && firstname_new.length > 0 && firstname_new !== firstname_old) {
        firstname = <Text color="cyan" component="span">{firstname_new}</Text>;
    } else {
        firstname = <Text component="span">{firstname_old}</Text>;
    }
    if (lastname_new !== null && lastname_new.length > 0 && lastname_new !== lastname_old) {
        lastname = <Text color="cyan" component="span">{lastname_new}</Text>;
    } else {
        lastname = <Text component="span">{lastname_old}</Text>;
    }
    return <Text>{lastname}, {firstname}</Text>
}

/*returns {street housenumber} as text and colors those values that will be changed */
const getFormattedStreetAndNumber = (request) => {
    const street_old = request.citizen_old.street;
    const house_number_old = request.citizen_old.housenumber;
    const street_new = request.citizen_new.street;
    const house_number_new = request.citizen_new.housenumber;
    let street, house_number;
    if (street_new !== null && street_new.length > 0 && street_new !== street_old) {
        street = <Text color="cyan" component="span">{street_new}</Text>;
    } else {
        street = <Text component="span">{street_old}</Text>;
    }
    if (house_number_new !== null && house_number_new.length > 0 && house_number_new !== house_number_old) {
        house_number = <Text color="cyan" component="span">{house_number_new}</Text>;
    } else {
        house_number = <Text component="span">{house_number_old}</Text>;
    }
    return <Text>{street} {house_number}</Text>
}

/*returns {city_cody city} as text and colors those values that will be changed */
const getFormattedCityCodeAndCity = (request) => {
    const city_code_old = request.citizen_old.city_code;
    const city_old = request.citizen_old.city;
    const city_code_new = request.citizen_new.city_code;
    const city_new = request.citizen_new.city;
    let city_code, city;
    if (city_code_new !== null && city_code_new !== city_code_old) {
        city_code = <Text color="cyan" component="span">{city_code_new}</Text>;
    } else {
        city_code = <Text component="span">{city_code_old}</Text>;
    }
    if (city_new !== null && city_new.length > 0 && city_new !== city_old) {
        city = <Text color="cyan" component="span">{city_new}</Text>;
    } else {
        city = <Text component="span">{city_old}</Text>;
    }
    return <Text>{city_code} {city}</Text>
}

export const AcceptRequestModal = ({ context, id, innerProps }) => (
    <form onSubmit={(event) => innerProps.handleAccept(event, id, innerProps.request.request_id)}>
        <Grid grow gutter="md" align="center">
            <Grid.Col span={12} xs={6}>
                <Text size="lg" weight={800}>Aktueller Name</Text>
                <Text>{innerProps.request.citizen_old.lastname}, {innerProps.request.citizen_old.firstname}</Text>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
                <Text size="lg" weight={800}>Neuer Name</Text>
                {getFormattedName(innerProps.request)}
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
                <Text size="lg" weight={800}>Aktuelle Adresse</Text>
                <Text>{innerProps.request.citizen_old.street} {innerProps.request.citizen_old.housenumber}</Text>
                <Text>{innerProps.request.citizen_old.city_code} {innerProps.request.citizen_old.city}</Text>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
                <Text size="lg" weight={800}>Neue Adresse</Text>
                {getFormattedStreetAndNumber(innerProps.request)}
                {getFormattedCityCodeAndCity(innerProps.request)}
            </Grid.Col>
            <Grid.Col span={12}>
                <Text size="lg" weight={800}>Begründung</Text>
                <Text>{innerProps.request.reasoning}</Text>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
                <Button fullWidth color="red" onClick={() => innerProps.handleDecline(id, innerProps.request.request_id)}>Ablehnen</Button>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
                <Button fullWidth color="green" type="submit">Annehmen</Button>
            </Grid.Col>
        </Grid>
    </form>
);