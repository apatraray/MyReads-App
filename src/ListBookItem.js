import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListBookItemPerCategory extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render(){
    const {books, updateShelf} = this.props

    return (
      <ol className="books-grid">
       {books.map((book) => (
        <li key={book.id} className="book-list-item">
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(event) => updateShelf(book, event.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.toString()}</div>
          </div>
        </li>
      ))}
      </ol>
    )
  }
}

export default ListBookItemPerCategory
