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
            <>
              <Card
                style={{ width: "22rem", border: "none" }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Price : ₹ {element.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(element)}
                      className="col-lg-12"
                    >
                      Add to Cart {quantity > 0 && `(${quantity})`}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
