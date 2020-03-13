import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";

import './App.css';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/" exact component={ArtistsPage}/>
                        <Route path="/albums" exact component={AlbumsPage}/>
                        <Route path="/tracks" exact component={TracksPage}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;
