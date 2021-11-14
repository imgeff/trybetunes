import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { objectAlbum } = this.props;
    return (
      <div className="MusicCard">
        { objectAlbum.map(({ trackName, previewUrl }) => (
          <div className="name-song" key={ trackName }>
            <p key={ trackName }>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
        )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  objectAlbum: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};

export default MusicCard;
