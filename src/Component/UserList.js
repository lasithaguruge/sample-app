import React, { Component } from 'react';
import { Button, Grid, Header, Segment, Table } from 'semantic-ui-react';

class UserList extends Component {
    render() {
        return (
            <div style={{ minHeight: '500px' }}>
                <Segment basic padded>
                    <Grid stackable>
                        <Grid.Column floated='left' width={5}>
                            <Header as='h1' floated='left'>Users</Header>
                        </Grid.Column>
                        <Grid.Column floated='right' width={1}>
                            <Button circular icon='plus' color='green' />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment basic padded textAlign='center'>
                    <Table basic='very'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Image</Table.HeaderCell>
                                <Table.HeaderCell>First name</Table.HeaderCell>
                                <Table.HeaderCell>Last name</Table.HeaderCell>
                                <Table.HeaderCell>Age</Table.HeaderCell>
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>

                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        )
    }
}

export default UserList;