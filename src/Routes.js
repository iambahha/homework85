import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";

const ProtectedRoute = ({isAllowed, ...props}) => {
  return isAllowed ? <Route {...props} /> : <Redirect to="/login" />
};

const Routes = ({user}) => {
  return (
    <Switch>
      <Route path="/" exact component={Artists}/>
      <Route path="/albums/:artist/:id" exact component={Albums}/>
      <Route path="/tracks/:id/:artist/:title" exact component={Tracks}/>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/track_history" exact component={TrackHistory} />
      <ProtectedRoute
        isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}
        path="/artists/new"
        exact
        component={NewArtist}
      />
      <ProtectedRoute
        isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}
        path="/albums/new"
        exact
        component={NewAlbum}
      />
      <ProtectedRoute
        isAllowed={(user && user.role === 'admin') || (user && user.role === 'user')}
        path="/tracks/new"
        exact
        component={NewTrack}
      />
    </Switch>
  );
};

export default Routes;