import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {apiURL} from "../../constans";
import {connect} from "react-redux";
import {fetchAlbum, publishAlbum, removedAlbum} from "../../store/actions/albumsActions";

class Albums extends Component {
  componentDidMount() {
    this.props.onFetchAlbum(this.props.match.params.id);
  }

  render() {
    return (
      <Fragment>
        <h2>{this.props.match.params.artist}</h2>
        <Row>
        {this.props.albums.map(album => (
          <Col key={album._id} sm="3">
              <Card style={{textAlign: 'center', marginBottom: '25px', height: '100%'}} body >
                  <CardImg top style={{width: "100%"}} src={apiURL + '/uploads/' + album.image} alt="Artist photo" />
                <CardBody>
                  <Link to={`/tracks/${album._id}/${album.artist.name}/${album.title}`}>
                    <CardTitle>{album.title}</CardTitle>
                  </Link>
                  <CardText>{album.date}</CardText>
                </CardBody>
                {(album.published === false) ? <h5 style={{color: 'red', textAlign: 'center'}}><strong>Not published!</strong></h5>: null}
                <Row>
                  {this.props.user && this.props.user.role === 'admin' &&
                  <Col sm={{size: 6}}>
                    <Button
                      color="primary"
                      className="float-left"
                      onClick={() => this.props.publishAlbum(album._id, {published: true}, album.artist._id)}
                    >
                      Publish
                    </Button>
                  </Col>
                  }
                  {this.props.user && this.props.user.role === 'admin' &&
                  <Col sm={{size: 6}}>
                    <Button
                      color="danger"
                      className="float-right"
                      onClick={() => this.props.removeAlbum(album._id, {removed: true}, album.artist._id)}
                    >
                      Remove
                    </Button>
                  </Col>
                  }
                </Row>
              </Card>
          </Col>
        ))}
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums.albums,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  onFetchAlbum: (albums) => dispatch(fetchAlbum(albums)),
  removeAlbum: (id, remove, artistId) => dispatch(removedAlbum(id, remove, artistId)),
  publishAlbum: (id, publish, artistId) => dispatch(publishAlbum(id, publish, artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
