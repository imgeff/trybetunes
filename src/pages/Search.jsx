import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
          found: data.some((album) => album.artistName.includes(nameResult)),
        }));
    });
  }

  render() {
    const { nameResult, artist, loading, albums, found } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="form-search">
          { loading ? <Loading /> : <Form
            testidInput="search-artist-input"
            testidButton="search-artist-button"
            placeholder="Nome da Banda ou Artista"
            nameButton="Pesquisar"
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            stateLength={ artist.length }
            minLength={ minLength }
          />}
        </div>
        <div className="albums-search">
          {found === false
          && <p>Nenhum álbum foi encontrado</p>}
          {albums.length > 0
            && <p>{`Resultado de álbuns de: ${nameResult}`}</p>}
          { albums.length > 0 && albums.map((album) => (
            <div key={ album.colectionId } className="album-card">
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <span>{album.collectionName}</span>
              <p>{album.artistName}</p>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Mais Detalhes
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
