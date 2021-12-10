import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../estilo/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameResult: '',
      artist: '',
      loading: false,
      albums: [],
      found: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      nameResult: target.value,
      artist: target.value,
    });
  }

  handleClick() {
    const { artist, nameResult } = this.state;
    this.setState({ loading: true }, () => {
      searchAlbumsAPI(artist)
        .then((data) => this.setState({
          artist: '',
          loading: false,
          albums: [...data],
          found: data.some((album) => (
            album.artistName.toLowerCase() === nameResult.toLowerCase()
          )),
        }));
    });
  }

  render() {
    const { nameResult, artist, loading, albums, found } = this.state;
    const MINLENGTHINPUT = 2;
    const MAXLENGTHNAME = 60;
    const DEFAULTLENGTH = 50;
    return (
      <div data-testid="page-search">
        <div className="form-search">
          { loading ? <Loading /> : <Form
            testidInput="search-artist-input"
            testidButton="search-artist-button"
            placeholder="Nome da Banda ou Artista"
            nameButton="Pesquisar"
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            stateLength={ artist.length }
            minLength={ MINLENGTHINPUT }
          />}
        </div>
        <div className="albums-search">
          {found === false
          && <p>Nenhum álbum foi encontrado</p>}
          {albums.length > 0
            && <p className="result-album">{`Resultado de álbuns de: ${nameResult}`}</p>}
          { albums.length > 0 && (
            albums.map(({ collectionId, artworkUrl100, collectionName, artistName }) => (
              <div key={ collectionId } className="album-card">
                <img src={ artworkUrl100 } alt={ collectionName } />
                <span>
                  {collectionName.length > MAXLENGTHNAME
                    ? collectionName.slice(0, DEFAULTLENGTH) : collectionName}
                </span>
                <p>{artistName}</p>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  Detalhes
                </Link>
              </div>
            )))}
        </div>
      </div>
    );
  }
}

export default Search;
