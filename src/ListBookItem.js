import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * This component actually reponsible for showing what should be displayed in
 * main page or search page
 */
class ListBookItem extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfBooks: PropTypes.array.isRequired,
    updateShelf : PropTypes.func.isRequired
  }
  //if book is not present, make it present
  state = {
    isBookPresent: false?0:1
  }
  //if a book is present in the search page, assign it a shelf only
  //after adding it to main page
  changeShelfValue = (book, shelfValue) => {
    this.props.shelfBooks.filter((b) => ((b.id === book.id) && (this.setState({isBookPresent: true}))))
    if(!(this.state.isBookPresent))
      (this.props.shelfBooks.push(book))
    this.props.updateShelf(book, shelfValue)
  }

  render(){
  const {books} = this.props
  return (
  <ol className="books-grid">
    {books.map((book) => (
      <li key={book.id} className="book-list-item">
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.smallThumbnail:'http://via.placeholder.com/128x193?text=bookThumbnail'})`}}>
            </div>
              <div className="book-shelf-changer">
                <select value={book.shelf || "none"} onChange={(event) => this.changeShelfValue(book, event.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?book.authors.join(", ") : ""}</div>
      </div>
    </li>
  ))}
  </ol>
)}
}
export default ListBookItem
