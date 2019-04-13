import React, {Component} from 'react'
import PropTypes from'prop-types'
import { Link } from 'react-router-dom'
import BooksList from './BooksList'
import * as BooksAPI from './BooksAPI';

class BookSearch extends Component {
    state = {
        query: '',
        searchedBooks: []
    }

    updateQuery = (query) => {
        this.setState({
            query:query
        })
        this.searchBooks(query);
    }

    searchBooks = (query,maxResults) => {
        BooksAPI.search(query,maxResults || 10)
        .then(searchedBooks => {
            if(!searchedBooks || searchedBooks.error)
                return []
            
            let response = [];
            for (const searchedBook of searchedBooks) {
                for (const book of this.props.books) {
                  if (searchedBook.id === book.id) {
                    searchedBook.shelf = book.shelf;
                  }
                }
                response.push(searchedBook);
              }
      
              return response;
        })
        .then(searchedBooks => {
            this.setState(prevState => ({searchedBooks}))
          })
          .catch(err => console.error('Error occurred searching books: ', err));
    }

    render() {
        const { onMoveBook } = this.props;
        const { query, searchedBooks } = this.state;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => 
                            this.updateQuery(event.target.value)}
                    />
                    </div>
                </div>
                <div className="search-books-results">
                <BooksList
                    books={searchedBooks}
                    onMoveBook={onMoveBook}
                />
                </div>
            </div>
            )
    }
}

BookSearch.propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default BookSearch;