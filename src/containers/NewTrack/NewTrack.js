import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import TrackForm from "../../components/TrackForm/TrackForm";
import {createTrack} from "../../store/actions/tracksActions";
import {fetchAlbums} from "../../store/actions/albumsActions";

class NewTrack extends Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  createTrack = trackData => {
    this.props.trackCreated(trackData).then(() => {
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <Fragment>
        <h2>New track</h2>
        <TrackForm
          onSubmit={this.createTrack}
          albums={this.props.albums}
          user={this.props.user}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums.albums,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  trackCreated: trackData => dispatch(createTrack(trackData)),
  fetchAlbums: () => dispatch(fetchAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrack);
