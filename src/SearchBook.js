import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBookItem from './ListBookItem';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import { debounce } from 'throttle-debounce';
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
    this.state.allBooks.map((book)=>{
      if(this.props.shelfBooks){
        this.props.shelfBooks.filter((b)=>(b.id === book.id) && (book.shelf=b.shelf))
      }
      if(!book.shelf)
        book.shelf="none"
      return this.setState((state)=>({
        allBooks: (state.allBooks)
    }))
  })
}

  updateQuery = (query) => {
    debounce(300,
    // Debounced function
      this.setState({query}))
    this.getSearchedBooks(query)
  }
  //when there is query, find the books and assign them a shelf
  getSearchedBooks = (query)=>{
    if(query!=='') {
      this.findBooks(query)
      console.log("query after find", query)
      console.log("allBooks after find", this.state.allBooks)

      this.getshelf()
      console.log("allBooks after shelf", this.state.allBooks)
    }
    else{
      this.setState({allBooks: []})
    }
  }

/*  changeSearchShelf = (book, shelf)=> {
    console.log("book", book)
    console.log("shelf", shelf)
    this.setState((state)=>({
      allBooks: (state.allBooks.filter((b)=>(b.id === book.id)&& (b.shelf = shelf))) && state.allBooks
    }))
  }*/
  //render the searchpage when there is change in state variables
  render() {
    const {shelfBooks, updateShelf} = this.props
    const {query, allBooks} = this.state
    console.log("inside render allBooks", allBooks)

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
