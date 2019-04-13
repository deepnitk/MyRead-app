import React , {Component} from 'react'
import PropTypes from 'prop-types'
import BooksList from './BooksList';
const SHELVES = ['currentlyReading','wantToRead','read'];

class ShelvesList extends Component {
    render() {
        const {books, onMoveBook} = this.props;

        return(
            <div>
                {SHELVES.map(shelf => (
                  <div className = 'bookshelf' key={shelf}>
                    <h2 className = 'bookshelf-title'>
                        {shelf.replace(/([A-Z])/g, ' $1')
                        .replace(/^./, function(str) {return str.toUpperCase(); 
                        })}
                    </h2>
                    <BooksList
                    books={books.filter(book => book.shelf === shelf)}
                    onMoveBook={onMoveBook}
                    />
                  </div>  
                ))}
            </div>
        )
    }
}

ShelvesList.PropTypes = {
    onMoveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}
export default ShelvesList;