import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import ListBookItemPerCategory from './ListBookItem';
import PropTypes from 'prop-types';

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf : PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({query: query.replace(/^\s+|\s+$/, ' ')})
  }
  clearQuery = (query) => {
    this.setState({query: ''})
  }

  render() {
    const {books, updateShelf} = this.props
    const {query} = this.state
    let showBooks
    const match = new RegExp(escapeRegExp(query), 'i')
    showBooks = books.filter((book) => match.test(book.title))
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
          {showBooks.length !== books.length && (
           <div className='showing-books'>
             <span>Found {showBooks.length} of {books.length} books</span>
             <button onClick={this.clearQuery}>show all</button>
           </div>
          )}
          <ListBookItemPerCategory books={showBooks} updateShelf={updateShelf}/>
        </div>
      </div>
    )
    }
  }

  export default SearchBook
