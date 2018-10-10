import React, { Component } from 'react';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import NoMatch from './NoMatch';
import { Route } from 'react-router-dom'
import { Switch } from 'react-router'
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
  }

  /**
   * change the shelf of the book in bookshelf in the main page according to id. Change the same in sever.
   */
  changeShelf= (book, shelf)=> {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((books)=>{
        this.setState({books})
      })
    this.setState((state)=>({
      books: (state.books.filter((b)=>(b.id === book.id)&& (b.shelf = shelf))) && state.books
    }))
  }

  render() {
    return (
      <div className="app">
      {/*route for the main page*/}
        <Switch>
          <Route path="/" exact render={() => (
            <ListBooks updateShelf={this.changeShelf} books={this.state.books}/>
          )}
          />
          {/*route for the search page*/}
          <Route path="/search" render={() => (
            <SearchBook updateShelf={this.changeShelf} shelfBooks={this.state.books}/>
          )}
          />
          {/*route to the error page for invalid url*/}
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}
export default BooksApp;
