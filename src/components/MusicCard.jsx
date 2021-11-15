import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.checked = this.checked.bind(this);
    this.noChecked = this.noChecked.bind(this);
  }

  componentDidMount() {
    getFavoriteSongs()
      .then((data) => this.setState({
        favoriteSongs: [...data],
      }));
  }

  handleChange({ target }) {
    const { objectAlbum } = this.props;
    const arrayOfAlbum = objectAlbum;
    const song = arrayOfAlbum.find((obj) => obj.trackId === Number(target.value));
    this.setState({ loading: true }, () => {
      addSong(song)
        .then(() => this.setState({
          loading: false,
        }));
    });
  }

  noChecked(trackid, handleChange) {
    const checkbox = (
      <label htmlFor={ trackid }>
        Favorita
        <input
          data-testid={ `checkbox-music-${trackid}` }
          value={ trackid }
          type="checkbox"
          id={ trackid }
          onChange={ handleChange }
        />
      </label>
    );
    return checkbox;
  }

  checked(trackid, handleChange) {
    const checkbox = (
      <label htmlFor={ trackid }>
        Favorita
        <input
          data-testid={ `checkbox-music-${trackid}` }
          value={ trackid }
          type="checkbox"
          id={ trackid }
          onChange={ handleChange }
          checked
        />
      </label>
    );
    return checkbox;
  }

  render() {
    const { objectAlbum } = this.props;
    const { loading, favoriteSongs } = this.state;
    const arrayOfAlbum = objectAlbum;
    return (
      <div className="MusicCard">
        {loading === true && <Loading /> }
        {
          arrayOfAlbum.slice(1).map(({ trackName, previewUrl, trackId }) => (
            <div className="name-song" key={ trackName }>
              <p key={ trackName }>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              {favoriteSongs.some((song) => song.trackId === trackId) ? (
                this.checked(trackId, this.handleChange)) : (
                this.noChecked(trackId, this.handleChange))}
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  objectAlbum: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
