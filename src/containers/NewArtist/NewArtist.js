import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {createArtist} from "../../store/actions/artistsActions";

class NewArtist extends Component {
  createArtist = artistData => {
    this.props.artistCreated(artistData).then(() => {
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <Fragment>
        <h2>New artist</h2>
        <ArtistForm
          user={this.props.user}
          onSubmit={this.createArtist}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  artistCreated: artistData => dispatch(createArtist(artistData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArtist);
