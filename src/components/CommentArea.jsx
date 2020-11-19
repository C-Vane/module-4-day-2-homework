import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Image, Form, Button } from 'react-bootstrap';
import "./CommentArea.css";
import CommentsList from './CommentsList';


class CommentArea extends React.Component {
    state = {
        reviews: [],
        errMessage: '',
        loading: false,
        review: {
            comment: '',
            rate: 0,
        },
    }
    componentDidMount = async () => {
        this.setState({ loading: true })
        const { book } = this.props;
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + book.asin, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2OTE2Mjk4MzViMDAwMTc1ODRmNTkiLCJpYXQiOjE2MDU4MDAyOTAsImV4cCI6MTYwNzAwOTg5MH0.EDD_ZH6yNBd1WStOkn3RPWNiO1Cm44mhsuhN43Auc2U",
                }
            })
            if (response.ok) {
                let reviews = await response.json()
                this.setState({ reviews, loading: false })
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }
    updateReviewField = {}
    render() {
        const { book, onHide } = this.props;
        const { reviews } = this.state;
        return (
            <Modal
                size="lg"
                aria-labelledby="bookComments"
                centered
            >
                <Modal.Header key={book.asin} closeButton>
                    <Modal.Title id="bookComments">
                        {book.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <Image src={book.img} fluid />
                        </Col>
                        <Col md="6">
                            <Row>
                                <CommentsList reviews={reviews} />
                            </Row>
                            <Row>
                                <Form>
                                    <h4>Your Review</h4>
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label htmlFor="comment">Comment:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                name="comment"
                                                id="comment"
                                                placeholder="Write yourn comment..."
                                                value={this.state.review.comment}
                                                onChange={this.updateReviewField}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Row>
                                            <Col>
                                                <Form.Group id="rating">
                                                    <Form.Label htmlFor="1">
                                                        <Form.Check
                                                            type="radio"
                                                            id="1"
                                                            label="☆"
                                                        />
                                                    </Form.Label>
                                                    <Form.Label htmlFor="2">
                                                        <Form.Check
                                                            type="radio"
                                                            id="2"
                                                            label="☆"
                                                        />
                                                    </Form.Label>

                                                    <Form.Label htmlFor="3">
                                                        <Form.Check
                                                            type="radio"
                                                            id="3"
                                                            label="☆"
                                                        />
                                                    </Form.Label>
                                                    <Form.Label htmlFor="4">
                                                        <Form.Check
                                                            type="radio"
                                                            id="4"
                                                            label="☆"
                                                        />
                                                    </Form.Label>
                                                    <Form.Label htmlFor="6">
                                                        <Form.Check
                                                            type="radio"
                                                            id="6"
                                                            label="☆"
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Button type="submit">Submit</Button>
                                </Form>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>);
    }
}


CommentArea.propTypes = { book: PropTypes.object, addComment: PropTypes.func, onHide: PropTypes.func };
CommentArea.defaultProps = { book: undefined };


export default CommentArea;