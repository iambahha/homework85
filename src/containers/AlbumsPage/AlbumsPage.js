import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchAlbums} from "../../store/actions/albumsActions";
import {ListGroup, ListGroupItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import ArtistThumbnail from "../../components/ArtistThumbnail/ArtistThumbnail";

import './AlbumsPage.css';

class AlbumsPage extends Component {
    componentDidMount(){
        this.props.fetchAlbums(this.props.location.search);
    };

    render() {
        if (!this.props.albums) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                <h2>Albums</h2>
                <ListGroup className="Artists">
                    {this.props.albums.map(album => (
                        <ListGroupItem className="Item" key={album._id}>
                            <NavLink className="Link" tag={RouterNavLink} to={`/tracks?album_id=${album._id}`} exact>
                                <ArtistThumbnail image={album.image} />
                                <span className="Album">{album.title} / </span>
                                <span className="Year">{album.year}</span>
                            </NavLink>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: (query) => dispatch(fetchAlbums(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);