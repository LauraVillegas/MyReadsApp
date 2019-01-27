import React from 'react'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book'
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props){  
    super(props);
    this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query : "",
    results: [],
    books: []
  }
}
changeQuery = (query) => {
  this.setState({ query: query}, this.search);
}
 search (){
  if (this.state.query === "" || this.state.query === undefined) {
    this.setState({ results : [] });
  }
  else{
  BooksAPI.search(this.state.query.trim()).then((res) => {
    if (res.error){
      this.setState({ results: [] });
    }
    else {
      res.forEach(b => {
        let f = this.state.books.filter(B => B.id === b.id);
        if (f[0]) {b.shelf = f[0].shelf;}
      });
      return this.setState({ results : res});
    }
  
  });
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
render (){
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={e =>this.changeQuery(e.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">

          <ol className="books-grid">
          {
            
          this.state.results.map((book, key) => <Book changeShelf={this.changeShelf} book={book} key={key} />)
        }
          </ol>
        </div>
      </div>
    )
}
}

export default Search;