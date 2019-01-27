import React from 'react'
import Book from './Book'
class shelf extends React.Component {
    render () {
        const books = this.props.books;
    return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {books.map( book => (
                <Book book={book} key={book.id} changeShelf={this.props.changeShelf}/>
            ))}
            </ol>
            </div>
            </div>)
                }
            }

export default shelf;            