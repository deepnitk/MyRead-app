import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BooksList extends Component {
    handleMove (book,event) {
        this.props.onMoveBook(book,event.target.value);
    }
    render(){
        const {books} = this.props;

        return(
            <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={this.handleMove.bind(this, book)}>
                                        <option value="none">Move to...</option>
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
                ))
                }
        </ol>
      </div>
        )
    }
}
BooksList.propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
}
export default BooksList;