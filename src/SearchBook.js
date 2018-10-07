import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBookItemPerCategory from './ListBookItem';
import PropTypes from 'prop-types';

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf : PropTypes.func.isRequired,
    getBooks : PropTypes.func.isRequired,
    shelfBooks : PropTypes.array.isRequired
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({query})
  }
  render() {
    const {books, getBooks, updateShelf, shelfBooks} = this.props
    const {query} = this.state

    if(query) {
      getBooks(query)
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event)=> this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBookItemPerCategory books={books} updateShelf={updateShelf} shelfBooks={shelfBooks}/>
        </div>
      </div>
    )
    }
  }

  export default SearchBook
