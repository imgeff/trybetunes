import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCart from '../components/MusicCard';
import Loading from '../components/Loading';
import '../estilo/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
      image: true,
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
    const { loading, favorites, image } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <nav>
          <div className="search">
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </div>
          <div className="favorites">
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </div>
          <div className="profile">
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </div>
        </nav>
        { loading ? <Loading /> : (
          <div className="favorites-songs">
            <p className="favorite-text">Músicas favoritas:</p>
            <div className="songs">
              <MusicCart objectAlbum={ favorites } image={ image } />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
