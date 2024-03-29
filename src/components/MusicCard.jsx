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
    const { objectAlbum, image } = this.props;
    const { loading, favoriteSongs } = this.state;
    const arrayOfAlbum = objectAlbum;
    return (
      <div className="music-card">
        {
          arrayOfAlbum.map(({ trackName, previewUrl, trackId, artworkUrl100 }) => (
            <div className="name-song" key={ trackName }>
              {image ? (<img src={ artworkUrl100 } alt={ trackId } className="img" />
              ) : null}
              <p key={ trackName }>{trackName}</p>
              {loading === true && <Loading />}
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

MusicCard.defaultProps = {
  image: false,
};

MusicCard.propTypes = {
  objectAlbum: PropTypes.arrayOf(PropTypes.object).isRequired,
  image: PropTypes.bool,
};

export default MusicCard;
