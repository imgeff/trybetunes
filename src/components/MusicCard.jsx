import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { objectAlbum } = this.props;
    const { loading } = this.state;
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
              <label htmlFor={ trackId }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  value={ trackId }
                  type="checkbox"
                  id={ trackId }
                  onChange={ this.handleChange }
                />
              </label>
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
