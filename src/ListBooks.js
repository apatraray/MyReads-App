import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListBookItemPerCategory from './ListBookItem';
import { Link } from 'react-router-dom';

/**
 * Implementation for the main page to show the books on the shelf
 */
class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf : PropTypes.func.isRequired
  }

  render(){
    const {books, updateShelf} = this.props
    //currently three shelfs are assigned to the main page
    const bookshelfs = [{id: "currentlyReading", title: "Currently Reading"},
                      {id: "wantToRead", title: "Want to Read"},
                      {id: "read", title: "Read"}]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <ol className="bookshelf-grid">
          {/*get the book according to the book shelf*/}
          {bookshelfs.map((bookshelf) => (
            <li key={bookshelf.id} className="bookshelf">
              <h2 className="bookshelf-title">{bookshelf.title}</h2>
              <div className="bookshelf-books">
                <ListBookItemPerCategory books={books.filter((book) => book.shelf===bookshelf.id)} updateShelf={updateShelf} shelfBooks={[]}/>
              </div>
            </li>
          ))}
          </ol>
        </div>
        <div className="open-search">
          <Link className="open-search-link" to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
