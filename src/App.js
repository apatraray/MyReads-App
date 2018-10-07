import React, { Component } from 'react';
import ListBooks from './ListBooks';
import SearchBook from './SearchBook';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component  {
  state = {
    books : [],
    allBooks : []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

  changeShelf= (book, shelf)=> {
    this.setState((state)=>({
      books: (state.books.filter((b)=>(b.id === book.id)&& (b.shelf = shelf))) && state.books,
      allBooks: (state.allBooks.filter((b)=>(b.id === book.id)&& (b.shelf = shelf))) && state.allBooks
    }))
    BooksAPI.update(book, shelf)
  }

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

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <ListBooks updateShelf={this.changeShelf} books={this.state.books}/>
        )}
        />
        <Route path="/search" render={() => (
          <SearchBook updateShelf={this.changeShelf} getBooks={this.findBooks}
          books={this.state.allBooks} shelfBooks={this.state.books}/>
        )}
        />
      </div>
    )
  }
}
export default BooksApp;
