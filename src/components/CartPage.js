import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DLT, updateCartQuantity } from "../redux/actions/action";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartreducer.carts);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity(item, newQuantity));
    } else {
      dispatch(DLT(item.id));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h2>Your cart is empty</h2>
        <img
          src="./cart.gif"
          alt="Empty Cart"
          style={{ width: "200px", marginTop: "2rem" }}
        />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3}>
                    <img
                      src={item.imgdata}
                      alt={item.rname}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Col>
                  <Col xs={4}>
                    <h5>{item.rname}</h5>
                    <p className="text-muted">Price: ₹{item.price}</p>
                  </Col>
                  <Col xs={3}>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="fw-bold"
                        onClick={() =>
                          handleQuantityChange(item, (item.quantity || 1) - 1)
                        }
                      >
                        −
                      </Button>
                      <span className="mx-3 fw-bold">{item.quantity || 1}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="fw-bold"
                        onClick={() =>
                          handleQuantityChange(item, (item.quantity || 1) + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col xs={2} className="text-end">
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => dispatch(DLT(item.id))}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h4>Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <strong>Total Price:</strong>
                <strong>₹{getTotalPrice()}</strong>
              </div>
              <Button variant="primary" className="w-100">
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
