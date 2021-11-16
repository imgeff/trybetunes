import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCart from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };

    this.requestFavorites = this.requestFavorites.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
  }

  componentDidMount() {
    this.requestFavorites();
  }

  componentDidUpdate() {
    this.updateFavorites();
  }

  requestFavorites() {
    this.setState({ loading: true }, () => {
      getFavoriteSongs()
        .then((data) => this.setState({
          favorites: [...data],
          loading: false,
        }));
    });
  }

  updateFavorites() {
    getFavoriteSongs()
      .then((data) => this.setState({
        favorites: [...data],
      }));
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : <MusicCart objectAlbum={ favorites } />}
      </div>
    );
  }
}

export default Favorites;
