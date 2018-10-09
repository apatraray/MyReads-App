import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBookItem from './ListBookItem';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

/**
 * Implementation for the search page
 */
class SearchBook extends Component {
  static propTypes = {
    updateShelf : PropTypes.func.isRequired,
    shelfBooks : PropTypes.array.isRequired
  }
  state = {
    query: '',
    allBooks : []
  }
  //function to get all the books matching to the search query
  findBooks = (query)=>{
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
  //set the result of searched books as none for default otherwise set the shelf
  //for those who are present in the bookshelf
  getshelf = () => {
    for(var i=0; i<this.state.allBooks.length; i++){
      if(this.props.shelfBooks){
//        this.state.allBooks[i].shelf = "none"
        this.props.shelfBooks.filter((b)=>(b.id === this.state.allBooks[i].id)&& (this.state.allBooks[i].shelf = b.shelf))
      }
    }
  }

  updateQuery = (query) => {
    this.setState({query})
  }
  //render the searchpage when there is change in state variables
  render() {
    const {updateShelf, shelfBooks} = this.props
    const {query, allBooks} = this.state
    //when there is query, find the books and assign them a shelf
    if(query) {
      this.findBooks(query)
      this.getshelf()
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
          <ListBookItem books={allBooks} updateShelf={updateShelf} shelfBooks={shelfBooks}/>
        </div>
      </div>
    )
    }
  }

  export default SearchBook
