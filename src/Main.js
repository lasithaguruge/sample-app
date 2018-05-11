import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Component/Home' 

class Main extends Component {
    render() {
        const publicRoutes = [
            <Route exact path='/' component={Home} key='/' />
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