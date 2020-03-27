import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {createAlbum} from "../../store/actions/albumsActions";
import {fetchArtist} from "../../store/actions/artistsActions";

class NewAlbum extends Component {
  componentDidMount() {
    this.props.fetchArtists();
  }

  createAlbum = albumData => {
    this.props.trackCreated(albumData).then(() => {
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <Fragment>
        <h2>New album</h2>
        <AlbumForm
          onSubmit={this.createAlbum}
          artists={this.props.artists}
          user={this.props.user}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  artists: state.artists.artists,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  trackCreated: albumData => dispatch(createAlbum(albumData)),
  fetchArtists: () => dispatch(fetchArtist())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);
