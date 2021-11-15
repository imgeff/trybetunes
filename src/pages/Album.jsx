import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      image: '',
      album: '',
      objectAlbum: [],
    };
  }

  componentDidMount() {
    this.requestSongs();
  }

  requestSongs() {
    const { props: { match: { params: { id } } } } = this;
    getMusics(id)
      .then((data) => this.setState({
        artist: data[0].artistName,
        image: data[0].artworkUrl100,
        album: data[0].collectionName,
        objectAlbum: [...data],
      }));
  }

  render() {
    const { artist, image, album, objectAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ image } alt={ album } />
        <h1 data-testid="album-name">{album}</h1>
        <span data-testid="artist-name">{artist}</span>
        <MusicCard objectAlbum={ objectAlbum } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
