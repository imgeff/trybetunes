import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="topic-search">
          <Link to="/search" data-testid="link-to-search">Search</Link>
        </div>
        <div className="topic-favorites">
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        </div>
        <div className="topic-profile">
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>
      </nav>
    );
  }
}

export default Nav;
