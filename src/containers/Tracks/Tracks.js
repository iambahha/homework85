import React, {Component, Fragment} from 'react';
import {Button, Card, CardBody, CardText, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {fetchTrack, publishTrack, removedTrack} from "../../store/actions/tracksActions";
import {fetchTrackHistory} from "../../store/actions/trackHistoryActions";

class Tracks extends Component {
  componentDidMount() {
    this.props.onFetchTrack(this.props.match.params.id);
  }

  render() {
    return (
      <Fragment>
        <h3>Artist: {this.props.match.params.artist}</h3>
        <h4>Album: {this.props.match.params.title}</h4>
        {this.props.tracks.map(track => (
          <Col key={track._id} sm="8">
            <Card
              style={{marginBottom: '25px'}}
            >
              <CardBody>
                <Row>
                  <Col sm={8}>
                <CardText onClick={() => this.props.trackHistory({track: track._id})}>№ {track.track_number} | <strong>{track.title}</strong> | <i>{track.time}</i>
                {(track.published === false) ?
                  <strong style={{color: 'red', textAlign: 'center', marginLeft: '15px'}}>
                    Not published!
                  </strong>
                  : null}
                </CardText>
                  </Col>

                {this.props.user && this.props.user.role === 'admin' &&
                <Col sm={{size: 2}}>
                  <Button
                    color="primary"
                    className="float-left"
                    onClick={() => this.props.publishTrack(track._id, {published: true}, track.album._id)}
                  >
                    Publish
                  </Button>
                </Col>
                }
                {this.props.user && this.props.user.role === 'admin' &&
                <Col sm={{size: 2}}>
                  <Button
                    color="danger"
                    className="float-right"
                    onClick={() => this.props.removeTrack(track._id, {published: true}, track.album._id)}
                  >
                    Remove
                  </Button>
                </Col>
                }
              </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.tracks.tracks,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  onFetchTrack: (tracks) => dispatch(fetchTrack(tracks)),
  trackHistory: (track) => dispatch(fetchTrackHistory(track)),
  removeTrack: (id, remove, albumId) => dispatch(removedTrack(id, remove, albumId)),
  publishTrack: (id, publish, albumId) => dispatch(publishTrack(id, publish, albumId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
