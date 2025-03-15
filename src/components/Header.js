import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/esm/Table";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DLT, updateCartQuantity } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const getTotalItems = () => {
    return getdata.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const total = () => {
    let price = 0;
    getdata.forEach((item) => {
      price += item.price * (item.quantity || 1);
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [getdata]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity(item, newQuantity));
    } else {
      dispatch(DLT(item.id));
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>

          <Badge
            badgeContent={getTotalItems()}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img
                              src={e.imgdata}
                              style={{ width: "5rem", height: "5rem" }}
                              alt=""
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p>{e.rname}</p>
                          <p>Price : ₹{e.price}</p>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-outline-secondary btn-sm fw-bold"
                              style={{
                                minWidth: "30px",
                                fontSize: "16px",
                                padding: "2px 8px",
                              }}
                              onClick={() =>
                                handleQuantityChange(e, (e.quantity || 1) - 1)
                              }
                            >
                              −
                            </button>
                            <span className="mx-2 fw-bold">
                              {e.quantity || 1}
                            </span>
                            <button
                              className="btn btn-outline-secondary btn-sm fw-bold"
                              style={{
                                minWidth: "30px",
                                fontSize: "16px",
                                padding: "2px 8px",
                              }}
                              onClick={() =>
                                handleQuantityChange(e, (e.quantity || 1) + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <i
                            className="fas fa-trash"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={4} className="text-end">
                      <strong>Total: ₹{price}</strong>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 22 }}>Your cart is empty</p>
              <img
                src="./cart.gif"
                alt=""
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
