import React, { Component } from "react";
import fantasy from "./books/fantasy.json";
import history from "./books/history.json";
import horror from "./books/horror.json";
import romance from "./books/romance.json";
import scifi from "./books/scifi.json";
import { Container, Form, CardColumns, Dropdown, Card, Button } from "react-bootstrap";
let books = [fantasy, history, horror, romance, scifi];

class LatestReleses extends Component {
  state = {
    category: 0,
  };
  handleChange = (event) => {
    console.log(this.state.category);
    this.setState({ category: parseInt(event.target.value) });
  };
  categorySelect = () => {
    return (
      <Form>
        <Form.Control as='select' variant='secondary' placeholder='Catagory' id='catagory' onChange={this.handleChange}>
          <option value='0'>Fantasy</option>
          <option value='1'>History</option>
          <option value='2'>Horror</option>
          <option value='3'>Romance</option>
          <option value='4'>Scifi</option>
        </Form.Control>
      </Form>
    );
  };
  booksCard=(i)=>{
    return(
    <CardColumns>
          {books[i].map((book) => (
            <Card>
              <Card.Img variant='top' src={book.img} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Price: ${book.price}</Card.Text>
                <Button variant='success'>Buy</Button>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>{book.category}</small>
              </Card.Footer>
            </Card>
          ))}
    </CardColumns>
    )
  };
  render() {
    return (
      <Container>
        {this.categorySelect()}
        {this.booksCard(this.state.category)}
      </Container>
    );
  }
}

export default LatestReleses;
