import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Menu } from 'semantic-ui-react'

class Header extends Component {
    state = { activeItem: '/' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        this.context.router.history.push(name);
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu size='tiny' inverted color={'teal'}>
                <Menu.Item 
                    name='/' 
                    active={activeItem === '/'} 
                    onClick={this.handleItemClick}>Home</Menu.Item>
                <Menu.Item 
                    name='/messages' 
                    active={activeItem === '/messages'} 
                    onClick={this.handleItemClick}>Messages</Menu.Item>

                <Menu.Menu position='right'>
                    <Dropdown item text='Language'>
                        <Dropdown.Menu>
                            <Dropdown.Item>English</Dropdown.Item>
                            <Dropdown.Item>Russian</Dropdown.Item>
                            <Dropdown.Item>Spanish</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item>
                        <Button primary>Sign Up</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

//here router validate the incoming prop types as objets, there for
//we need to specify the prop type as object
Header.contextTypes = {
    router: PropTypes.object.isRequired
}

export default Header;