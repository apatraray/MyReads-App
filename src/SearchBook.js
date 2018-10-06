import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
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
//    this.setState({query: query.replace(/^\s+|\s+$/, ' ')})
//    let newQuery = query.replace(/^\s+|\s+$/, ' ')
    this.setState({query})

    BooksAPI.search(query).then((allBooks)=>{
      this.setState({allBooks})
    })
    if(this.state.allBooks === undefined)
      this.setState({allBooks: []})
    console.log("query",query)
    console.log(this.state.allBooks)

  }
  render() {
    const {books, updateShelf} = this.props
    const {query, allBooks} = this.state
/*    let showBooks=[]
    console.log("query",query)
    const match = new RegExp(escapeRegExp(query), 'i')
    console.log(allBooks)
    if(allBooks !== undefined ){
      if(allBooks.error !== "empty query")
        showBooks = allBooks.filter((book) => match.test(book.title))
    }*/

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
          <ListBookItemPerCategory books={allBooks} updateShelf={updateShelf}/>
        </div>
      </div>
    )
    }
  }

  export default SearchBook
