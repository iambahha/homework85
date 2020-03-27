import React, {Component, Fragment} from 'react';
import {fetchArtist, publishArtist, removedArtist} from "../../store/actions/artistsActions";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {apiURL} from "../../constans";
import {Link} from "react-router-dom";

class Artists extends Component {
  componentDidMount() {
    this.props.onFetchArtist();
  }

  render() {
    return (
      <Fragment>
        <h1>Artists</h1>
        <Row>
        {this.props.artists.map(artist => (
          <Col key={artist._id} sm={4} style={{marginBottom: '25px'}}>

              <Card style={{height: '100%'}}>
                <CardImg top style={{width: "100%"}} src={apiURL + '/uploads/' + artist.photo} alt="Artist photo" />
                <CardBody>
                  <Link to={`/albums/${artist.name}/${artist._id}`}>
                    <CardTitle style={{textAlign: 'center'}}><h2>{artist.name}</h2></CardTitle>
                  </Link>
                  <CardText>{artist.description}</CardText>
                </CardBody>
                {(artist.published === false) ? <h5 style={{color: 'red', textAlign: 'center'}}><strong>Not published!</strong></h5>: null}
                <Row>
                  {this.props.user && this.props.user.role === 'admin' &&
                    <Col sm={{size: 6}}>
                      <Button
                        style={{margin: '20px'}}
                        color="primary"
                        className="float-left"
                        onClick={() => this.props.publishArtist(artist._id, {published: true})}
                      >
                        Publish
                      </Button>
                    </Col>
                  }
                  {this.props.user && this.props.user.role === 'admin' &&
                    <Col sm={{size: 6}}>
                      <Button
                        style={{margin: '20px'}}
                        color="danger"
                        className="float-right"
                        onClick={() => this.props.removeArtist(artist._id, {removed: true})}
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
  artists: state.artists.artists,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  onFetchArtist: () => dispatch(fetchArtist()),
  removeArtist: (id, remove) => dispatch(removedArtist(id, remove)),
  publishArtist: (id, published) => dispatch(publishArtist(id, published))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);