import React, { Component } from 'react';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component  {
  state = {
    books : []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }
  componentDidUpdate() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }
  changeShelf= (book, shelf)=> {
    this.setState((state)=>({
      books: (state.books.filter((b)=>(b.id === book.id)&& (b.shelf = shelf))) && state.books
    }))
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <ListBooks updateShelf={this.changeShelf} books={this.state.books}/>
        )}
        />
        <Route path="/search" render={() => (
          <SearchBook updateShelf={this.changeShelf} shelfBooks={this.state.books}/>
        )}
        />
      </div>
    )
  }
}
export default BooksApp;
