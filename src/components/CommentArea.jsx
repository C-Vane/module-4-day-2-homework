import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Image, Form, Button, ToggleButtonGroup, ToggleButton, Spinner } from 'react-bootstrap';
import "./CommentArea.css";
import CommentsList from './CommentsList';


class CommentArea extends React.Component {
    state = {
        errMessage: '',
        loading: false,
        refreshList: false,
        review: {
            comment: '',
            rate: "0",
            elementId: ""
        },
    }

    addComment = async (event) => {
        event.preventDefault()
        const { book } = this.props;
        this.setState({ loading: true })
        const { review } = this.state;
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/",
                {
                    method: 'POST',
                    body: JSON.stringify(review),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2OTE2Mjk4MzViMDAwMTc1ODRmNTkiLCJpYXQiOjE2MDU4MDAyOTAsImV4cCI6MTYwNzAwOTg5MH0.EDD_ZH6yNBd1WStOkn3RPWNiO1Cm44mhsuhN43Auc2U",
                    })
                })
            if (response.ok) {
                // alert('Comment sent!')
                this.setState({
                    review: {
                        comment: '',
                        rate: "0",
                        elementId: ""
                    },
                    errMessage: '',
                    loading: false,
                    refreshList: true,
                })
            } else {
                console.log('an error occurred')
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false,
                })
            }
        } catch (e) {
            console.log(e) // Error
            alert(e)
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
    }

    commentSection = () => {
        const { rate, comment } = this.state;
        return (
            <Form onSubmit={this.addComment} className="col col-12 m-0">
                <h4>Your Review</h4>
                <Col>
                    <Form.Group >
                        <Form.Label htmlFor="comment">Comment:</Form.Label>
                        <Form.Control
                            className="col col-12 m-0"
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder="Write your comment..."
                            value={comment}
                            onChange={this.updateReviewField}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Form.Group id="rate" className="d-flex">
                                <ToggleButtonGroup type="checkbox" name="rate" value={rate} onChange={this.handelRate}>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={1}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={2}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={3}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={4}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={5}>☆</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Button type="submit" variant="outline-primary">Submit</Button>
            </Form>
        );
    }
    handelRate = (val) => {
        const review = { ...this.state.review };
        review.rate = val.length.toString();
        this.setState({ review });
    };
    updateReviewField = (event) => {
        const { book } = this.props;
        const review = { ...this.state.review }
        const name = event.currentTarget.name;
        review.elementId = book.asin;
        review[name] = event.currentTarget.value
        this.setState({ review });
        console.log(this.state.review)
    }

    render() {
        const { book, onHide, show } = this.props;


        return (
            <Container
                size="lg"
                aria-labelledby="bookComments"
            >
                <div key={book.asin} onClick={onHide}>
                    <h2 id="bookComments">
                        {book.title}
                    </h2>
                    <div>

                        <Row>
                            <Image src={book.img} rounded fluid />
                            <Row className="m-1">
                                {this.commentSection()}
                                {
                                    this.state.loading && (
                                        <div className="d-flex justify-content-center my-5">
                                            Saving comment, please wait
                                            <div className="ml-2">
                                                <Spinner animation="border" variant="success" />
                                            </div>
                                        </div>
                                    )
                                }
                            </Row>

                            <Row>
                                <Col>
                                    <CommentsList id={book.asin} refreshList={this.state.refreshList} />
                                </Col>
                            </Row>

                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}


CommentArea.propTypes = { book: PropTypes.object.isRequired, onHide: PropTypes.func, show: PropTypes.bool };
CommentArea.defaultProps = { book: undefined };


export default CommentArea;