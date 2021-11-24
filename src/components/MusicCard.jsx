import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import heart from '../images/heart-icon.svg';
import '../estilo/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.recoverObject = this.recoverObject.bind(this);
    this.checked = this.checked.bind(this);
    this.noChecked = this.noChecked.bind(this);
  }

  componentDidMount() {
    this.recoverObject();
  }

  componentDidUpdate() {
    getFavoriteSongs()
      .then((data) => this.setState({
        favoriteSongs: [...data],
      }));
  }

  handleChange({ target }) {
    const { objectAlbum } = this.props;
    const { favoriteSongs } = this.state;
    const arrayOfAlbum = objectAlbum;
    const song = arrayOfAlbum.find((obj) => obj.trackId === Number(target.value));
    const duplicate = favoriteSongs.some((track) => track.trackId === song.trackId);
    if (duplicate) {
      this.setState({ loading: true }, () => {
        removeSong(song)
          .then(() => this.setState({ loading: false }));
      });
    } else {
      this.setState({ loading: true }, () => {
        addSong(song)
          .then(() => this.setState({ loading: false }));
      });
    }
  }

  recoverObject() {
    const { objectAlbum } = this.props;
    this.setState({ favoriteSongs: [objectAlbum] });
  }

  noChecked(trackid, handleChange) {
    const checkbox = (
      <label htmlFor={ trackid }>
        <input
          data-testid={ `checkbox-music-${trackid}` }
          value={ trackid }
          type="checkbox"
          id={ trackid }
          onChange={ handleChange }
        />
        <div className="mark-check">
          <img src={ heart } alt="favorite" />
        </div>
      </label>
    );
    return checkbox;
  }

  checked(trackid, handleChange) {
    const checkbox = (
      <label htmlFor={ trackid }>
        <input
          data-testid={ `checkbox-music-${trackid}` }
          value={ trackid }
          type="checkbox"
          id={ trackid }
          onChange={ handleChange }
          checked
        />
        <div className="mark-check">
          <img src={ heart } alt="favorite" />
        </div>
      </label>
    );
    return checkbox;
  }

  render() {
    const { objectAlbum } = this.props;
    const { loading, favoriteSongs } = this.state;
    const arrayOfAlbum = objectAlbum;
    return (
      <div className="music-card">
        {loading === true && <Loading /> }
        {
          arrayOfAlbum.map(({ trackName, previewUrl, trackId }) => (
            <div className="name-song" key={ trackName }>
              <p key={ trackName }>{trackName}</p>
              <div className="audio">
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
              </div>
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
