import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelvesList from './ShelvesList';
import BookSearch from './BooksSearch';

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

  render() {
    return (
      <div className='app'>
        <div className='List-books-title'>
          <h1>MyReads</h1>
        </div>
        <ShelvesList/>
        <BookSearch/>
      </div>
    )
  }
}

export default BooksApp
