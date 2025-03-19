import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, DLT, updateCartQuantity } from "../redux/actions/action";

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartreducer.carts);

  useEffect(() => {
    const item = cartItems.find((item) => item.id.toString() === id);
    setData(item ? [item] : []);
  }, [id, cartItems]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity(item, newQuantity));
    } else {
      handleRemove(item.id);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemove = (itemId) => {
    dispatch(DLT(itemId));
    navigate("/cart");
  };

  if (data.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h2>Product not found</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="mt-3"
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const item = data[0];
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Container className="mt-4">
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src={item.imgdata}
                alt={item.rname}
                className="img-fluid rounded"
                style={{
                  maxHeight: "400px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col md={6}>
              <h2 className="mb-4">{item.rname}</h2>
              <div className="mb-4">
                <h4 className="text-primary mb-3">₹{item.price}</h4>
                <p className="text-muted">{item.address}</p>
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-success text-white px-2 py-1 rounded">
                    {item.rating} ★
                  </span>
                  <span className="ms-2 text-muted">{item.somedata}</span>
                </div>
              </div>

              {quantity > 0 ? (
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center border rounded px-2">
                    <Button
                      variant="link"
                      className="text-dark p-2"
                      onClick={() => handleQuantityChange(item, quantity - 1)}
                      style={{ width: "40px", minWidth: "40px" }}
                    >
                      −
                    </Button>
                    <span className="mx-3 fw-bold" style={{ minWidth: "20px", textAlign: "center" }}>
                      {quantity}
                    </span>
                    <Button
                      variant="link"
                      className="text-dark p-2"
                      onClick={() => handleQuantityChange(item, quantity + 1)}
                      style={{ width: "40px", minWidth: "40px" }}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove from Cart
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CardsDetails;
