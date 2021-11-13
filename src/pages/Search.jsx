import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      artist: target.value,
    });
  }

  render() {
    const { artist } = this.state;
    const minLength = 2;

    const enabled = (
      <button
        data-testid="search-artist-button"
        type="button"
      >
        Pesquisar
      </button>);

    const disabled = (
      <button
        data-testid="search-artist-button"
        type="button"
        disabled="true"
      >
        Pesquisar
      </button>);

    return (
      <div data-testid="page-search">
        <Header />
        <div className="form-search">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Nome do Artista"
              onChange={ this.handleChange }
            />
            { artist.length >= minLength ? enabled : disabled}
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
