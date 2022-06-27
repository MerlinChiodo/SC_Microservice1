import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Text, Title, Anchor, List, ThemeIcon } from "@mantine/core";
import { Link as ELink } from "tabler-icons-react";

export const Home = () => {

  const [permits, setPermits] = useState([]);

  const loadPermits = async () => {
    fetch("/api/permits")
      .then(res => res.json())
      .then(data => {
        let permitsTemp = [];
        data.permits.forEach(permit => {
          permitsTemp.push(permit.title);
        });
        setPermits(permitsTemp);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    document.title = "Bürgerbüro - Startseite";
    loadPermits();
  }, []);

  const icon = <ThemeIcon radius="xl" color="green" size={20} variant="outline" ><ELink size={15} color="gray" /></ThemeIcon>;

  return (
    <>
      <Title mt={20}>Wilkommen beim Bürgerbüro</Title>
      <Title order={2}>Das kannst du hier alles erledigen</Title>
      <br />
      <Text size="xl" weight={700}>alle Bürger:</Text>
      <List size="xl" color="gray" icon={icon}>
        <List.Item>
          <Anchor to="/melden" component={Link} size="xl" onClick={(e) => window.scrollTo(0, 0)} color="gray">
            in der SmartCity Melden
          </Anchor>
        </List.Item>
      </List>
      <br />
      <Text size="xl" weight={700}>als gemeldeter Bürger der SmartCity:</Text>
      <List size="xl" >
        <List.Item icon={icon}>
          <Anchor to="/genehmigungen" component={Link} size="xl" onClick={(e) => window.scrollTo(0, 0)} color="gray">
            erteilte Genehmigungen ansehen / neue Genehmigungen beantragen
          </Anchor>
          {permits.length > 0 && (
            <List withPadding listStyleType="disc" size="lg" >
              <List.Item>
                Mögliche Genehmigungen:
                <List withPadding listStyleType="disc" >
                  {permits.map(permit => (
                    <List.Item key={permit}>{permit}</List.Item>
                  ))}
                </List>
              </List.Item>
            </List>
          )}
        </List.Item>
        <List.Item icon={icon}>
          <Anchor to="/account" component={Link} size="xl" onClick={(e) => window.scrollTo(0, 0)} color="gray">
            Bürgerdaten ansehen/ändern
          </Anchor>
        </List.Item>
      </List>
    </>
  );
};
