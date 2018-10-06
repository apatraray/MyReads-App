import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBookItemPerCategory from './ListBookItem';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf : PropTypes.func.isRequired
  }
  state = {
    query: '',
    allBooks: []
  }
  updateQuery = (query) => {
    this.setState({query})
    BooksAPI.search(query).then((allBooks)=>{
      if(allBooks !== undefined ){
        if(allBooks.error !== "empty query"){
          this.setState({allBooks})
        }
        else {
          this.setState({allBooks: []})
         }
        }
        else {
          this.setState({allBooks: []})
        }
      })
  }
  render() {
    const {books, updateShelf} = this.props
    const {query, allBooks} = this.state

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
          <ListBookItemPerCategory books={allBooks} updateShelf={updateShelf} shelfBooks={books}/>
        </div>
      </div>
    )
    }
  }

  export default SearchBook
