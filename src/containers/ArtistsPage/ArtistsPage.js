import React, {Component, Fragment} from 'react';
import {ListGroup, ListGroupItem, NavLink} from "reactstrap";
import {connect} from "react-redux";
import {fetchArtists} from "../../store/actions/artistsActions";
import ArtistThumbnail from "../../components/ArtistThumbnail/ArtistThumbnail";
import {NavLink as RouterNavLink} from "react-router-dom";

import './ArtistsPage.css';

class ArtistsPage extends Component {
    componentDidMount() {
        this.props.fetchArtists();
    };

    render() {
        if (!this.props.artists) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                <h2>All Artists <i>({this.props.artists.length})</i></h2>
                <ListGroup className="Artists">
                    {this.props.artists.map(artist => (
                        <ListGroupItem className="Item" key={artist._id}>
                            <NavLink className="Link" tag={RouterNavLink} to={`/albums?artist_id=${artist._id}`} exact>
                            <ArtistThumbnail image={artist.image} />
                            <span>{artist.name}</span>
                            </NavLink>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists
});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage);