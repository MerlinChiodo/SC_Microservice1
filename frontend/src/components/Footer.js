import { createStyles, Container, Group, Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        [theme.fn.smallerThan('xs')]: { flexDirection: 'column', },
    },
    links: { [theme.fn.smallerThan('xs')]: { marginTop: theme.spacing.md, }, },
}));

export default function Footer() {

    const { classes } = useStyles();
    const links = [
        { link: "/impressum", label: "Impressum" },
        { link: "/datenschutz", label: "Datenschutz" },
        { link: "/admin", label: "Mitarbeiter" }
    ];
    const items = links.map((link) => (
        <Anchor color="dimmed" size="sm" component={Link} key={link.label} to={link.link} onClick={(e) => window.scrollTo(0, 0)}>
            {link.label}
        </Anchor >
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Text>Bürgerbüro</Text>
                <Group className={classes.links}>
                    <Anchor color="dimmed" size="sm" href='http://www.supersmartcity.de'>
                        Landingpage
                    </Anchor>
                    {items}
                </Group>
            </Container>
        </div>
    );
}