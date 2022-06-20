import React from "react";
import { Paper, Title, Container, } from '@mantine/core';

export class PageContainer extends React.Component {

    constructor(props) {
        super(props);
        this.size = props.size || 1000;
        this.title = props.title || "";
    }

    render() {
        return (
            <Container size={this.size} my={40}>
                <Title align="center" order={1} sx={() => ({ fontWeight: 900 })} >
                    {this.title}
                </Title>
                <Paper withBorder shadow="md" p={30} mt="lg" radius="md" sx={(theme) => ({ backgroundColor: theme.colors.dark[7] })}>
                    {this.props.children}
                </Paper>
            </Container>
        );
    }
}