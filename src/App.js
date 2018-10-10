import React, { Component } from 'react';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';

/**
 * Implements BooksApp class from the React component
 */
class BooksApp extends Component  {
  state = {
    books : []
  }

  /**
   * update the bookself in the main page from the server after all the component get mount
   */
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
    console.log("first")
  }

  /**
   * update the bookself in the main page from the server data after there is update in the component
*/
  /**
   * change the shelf of the book in bookshelf in the main page according to id. Change the same in sever.
   */
  changeShelf= (book, shelf)=> {
    this.setState((state)=>({
      books: (state.books.filter((b)=>(b.id === book.id)&& (b.shelf = shelf))) && state.books
    }))
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
    console.log("second")
  }
//render the App
  render() {
    return (
      <div className="app">
      {/*route for the main page*/}
        <Route path="/" exact render={() => (
          <ListBooks updateShelf={this.changeShelf} books={this.state.books}/>
        )}
        />
        {/*route for the search page*/}
        <Route path="/search" render={() => (
          <SearchBook updateShelfSearch={this.changeShelf} updateShelf={this.changeShelf} shelfBooks={this.state.books}/>
        )}
        />
      </div>
    )
  }
}
export default BooksApp;
