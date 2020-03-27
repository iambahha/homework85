import React, {Component, Fragment} from 'react';
import {Card, CardBody, CardText} from "reactstrap";
import {trackHistory} from "../../store/actions/trackHistoryActions";
import {connect} from "react-redux";

class TrackHistory extends Component {
  componentDidMount() {
    this.props.fetchTrackHistory();
  }

  render() {
    return (
      <Fragment>
        {this.props.trackHistory && this.props.trackHistory.map(track => (
          <Card key={track._id} style={{marginBottom: '25px'}} >
            <CardBody>
              <CardText><strong>{track.track.album.artist.name} - {track.track.title}</strong> | <i>{track.datetime}</i></CardText>
            </CardBody>
          </Card>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  trackHistory: state.trackHistory.trackHistory,
});

const mapDispatchToProps = dispatch => ({
  fetchTrackHistory: () => dispatch(trackHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);