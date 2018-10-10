import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Implementation for the error page
 */
class NoMatch extends Component {
  render() {
    return (
      <div>
        <Link className="close-search" to="/">Go to main page</Link>
        <a href='https://www.figma.com/404/'>Found 404 error</a>
      </div>
    )
  }
}

export default NoMatch
