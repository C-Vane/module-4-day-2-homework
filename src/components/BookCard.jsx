import React from 'react';

import { CardColumns, Card, Button } from "react-bootstrap";

const BookCard = (prop) => {
const {books}= prop;
    return (
         books?
        <CardColumns>
            {books.map((book) => (
                <Card key={book.asin}>
                    <Card.Img variant='top' src={book.img} />
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>Price: ${book.price}</Card.Text>
                        <Button variant='success'>Buy</Button>
                    </Card.Body>
                </Card>
            ))}
        </CardColumns>: null
        
    );

}

export default BookCard;