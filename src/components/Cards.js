import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/action";
import Cardsdata from "./CardsData";
import "./style.css";

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  // console.log(data);

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartreducer.carts);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const getItemQuantity = (id) => {
    const cartItem = cartData.find((item) => item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart Projects</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          const quantity = getItemQuantity(element.id);
          return (
            <div
              key={element.id}
              className="col-md-4 mb-4"
              style={{ minWidth: "300px" }}
            >
              <Card
                style={{ height: "100%", border: "none" }}
                className="mx-2 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.imgdata}
                  style={{ height: "16rem", objectFit: "cover" }}
                  className="mt-3"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Price : ₹ {element.price}</Card.Text>
                  <div className="button_div mt-auto">
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(element)}
                      className="w-100"
                    >
                      Add to Cart {quantity > 0 && `(${quantity})`}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
