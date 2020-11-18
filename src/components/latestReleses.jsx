import React, { Component } from "react";
import fantasy from "../books/fantasy.json";
import history from "../books/history.json";
import horror from "../books/horror.json";
import romance from "../books/romance.json";
import scifi from "../books/scifi.json";
import BookCard from "./BookCard"
import { Container } from "react-bootstrap";
import CategoryItem from "./CategoryItem";

class LatestReleses extends Component {
  state = {
    category: 0,
    books: [fantasy, history, horror, romance, scifi],
    sort: false,
    search: [],
    search_value: "",
    category_names: ["fantasy", "history", "horror", "romance", "scifi"],
  };

  handleChange = (event) => {
    this.setState({ category: event.target.value });
  };
  handleSort = (event) => {
    this.setState({ sort: true });
    //sortBooks();
  };

  searchBooks = (event) => {
    const search_key = event.target.value;
    const { books } = this.state;
    let result = [];
    books.forEach((cat) => {
      result.push(cat.filter((book) => book.title.toLowerCase().includes(search_key.toLowerCase())));
    })
    this.setState({
      search: search_key.length > 3 ? result.flat() : "",
      search_value: search_key,
    });
  }
  categorySelect = () => {
    const { category, category_names } = this.state;
    return (
      <CategoryItem category={category} categoryNames={category_names} onSearch={this.searchBooks} onChange={this.handleChange}></CategoryItem>
    );
  };

  render() {
    const { category, books, search, search_value } = this.state;
    let book;
    if (search_value.length > 3) {
      book = (search.length > 0) ? <BookCard books={search} /> : 
      <p className="mt-4">No Books found named {search_value} ...</p>
    } else {
      book = <BookCard books={books[category]} />
    }
    return (
      <Container>
        {this.categorySelect()}
        {book}
      </Container>
    );
  }
}

export default LatestReleses;
