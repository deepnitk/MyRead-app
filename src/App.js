import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelvesList from './ShelvesList';
import BookSearch from './BooksSearch';
import {Route,Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = { 
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books =>{
        this.setState({books});
      })
  }

  moveBook = (book,shelf) => {
    BooksAPI.update(book,shelf)
      .then(this.setState(prevState =>{
        let found =false;
        const newState = prevState.books.map(b => {
          if(b.id === book.id) {
            b.shelf = shelf;
            found = true;
          }
          return b;
        });
        if(!found) {
          book.shelf =shelf;
          newState.push(book);
        }
        return {books:newState};
      }))
  }

  render() {
    return (
      <div className='app'>
        <div className='List-books-title'>
          <h1>MyReads</h1>
        </div>
        <ShelvesList
          books = {this.state.books}
          onMoveBook = {this.moveBook}
        />
        <div className="open-search">
              <Link to="/search">Add a book</Link>
        </div>
        <Route path="/search" render={ ({history}) => (
          <BookSearch
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
