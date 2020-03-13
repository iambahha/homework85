import React, {Component, Fragment} from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import {fetchTracks} from "../../store/actions/tracksAction";

import './TracksPage.css';

class TracksPage extends Component {
    componentDidMount(){
        this.props.fetchTracks(this.props.location.search);
    };

    render() {
        if (!this.props.tracks) {
            return <div>Loading...</div>
        }

        console.log();
        return (
            <Fragment>
                <h2>Tracks</h2>
                <ListGroup className="Tracks">
                    {this.props.tracks.map(track => (
                        <ListGroupItem className="Item" key={track._id}>
                            <span className="Track">{track.number}. {track.title}</span>
                            <span className="Duration">{track.duration}</span>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    tracks: state.tracks.tracks
});

const mapDispatchToProps = dispatch => ({
    fetchTracks: (query) => dispatch(fetchTracks(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);