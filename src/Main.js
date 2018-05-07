import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Component/Home';
import UserList from './Component/UserList'; 

class Main extends Component {
    render() {
        const publicRoutes = [
            <Route exact path='/' component={Home} key='/' />,
            <Route exact path='/messages' component={UserList} key='/messages' />
        ]
        return (
            <main>
                <Switch>
                    {publicRoutes}
                </Switch>
            </main>
        );
    }
}

export default Main;