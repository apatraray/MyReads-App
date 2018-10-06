import React from 'react';

const ListBookItemPerCategory = (props) =>(
  <ol className="books-grid">
    {props.books.map((book) => (
      <li key={book.id} className="book-list-item">
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.smallThumbnail:'http://via.placeholder.com/128x193?text=bookThumbnail'})`}}>
            </div>
              <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(event) => props.updateShelf(book, event.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  ))}
  </ol>
)

export default ListBookItemPerCategory
