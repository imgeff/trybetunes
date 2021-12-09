import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="topic-search">
          <NavLink
            to="/search"
            data-testid="link-to-search"
            activeClassName="selected"
          >
            Search
          </NavLink>
        </div>
        <div className="topic-favorites">
          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
            activeClassName="selected"
          >
            Favorites
          </NavLink>
        </div>
        <div className="topic-profile">
          <NavLink
            to="/profile"
            data-testid="link-to-profile"
            activeClassName="selected"
          >
            Profile
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Nav;
