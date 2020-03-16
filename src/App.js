import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import TrackHistoryPage from "./containers/TrackHistoryPage/TrackHistoryPage";

import './App.css';
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {logoutUser} from "./store/actions/usersActions";

class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar user={this.props.user} logout={this.props.logout} />
                </header>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/" exact component={ArtistsPage}/>
                        <Route path="/albums" exact component={AlbumsPage}/>
                        <Route path="/tracks" exact component={TracksPage}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/track-history" exact component={TrackHistoryPage}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));