import React from 'react'
import '../../App.css'
import Shelf from '../Shelf'
import Header from '../Header'
import * as BooksAPI from '../../BooksAPI'
import { Link } from 'react-router-dom';

class Main extends React.Component {
 
  constructor(props){  
    super(props);
    this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }
}


  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState( state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
    }))
  });
  }
  componentDidMount() {
    BooksAPI.getAll().then((resp) => this.setState({ books : resp }));
  }
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <Header/>
            <div className="list-books-content">
            <div>
            <Shelf changeShelf={this.changeShelf} title="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")}/>
            <Shelf changeShelf={this.changeShelf} title="Want to Read" books={this.state.books.filter(book => book.shelf === "wantToRead")}/>
            <Shelf changeShelf={this.changeShelf} title="Read" books={this.state.books.filter(book => book.shelf === "read")}/>
            </div>
            </div>
            <div >
            <Link className="open-search" to="/search">Add a book</Link>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Main
