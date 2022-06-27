import { useEffect } from "react";
import { Text, Title } from "@mantine/core";


export default function Datenschutz() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Title>Datenschutz</Title>
            <br />
            <Text size="md" weight={700}>Diese Website ist ein studentisches Projekt der FH Bielefeld im Rahmen des Moduls Softwareprojekt des Informatikstudiengangs am Campus Minden.</Text>
            <br />
            <Text size="md" weight={700}>Diese Website ist nicht für einen echten Einsatz gedacht. Keine Daten sind echt, sondern Musterdaten, um die Funktionalität zu testen und zu präsentieren.</Text>
        </div>
    );
}