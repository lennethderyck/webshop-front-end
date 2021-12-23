import { Link } from "react-router-dom";
import "../css/product.css";
import { addToCart } from "../context/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Product = ({ id, name, price, img }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [item, setItem] = useState([]);

  //Adds an item to the cart
  const addToCartS = () => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  //Sets the item to change the inCart value
  useEffect(() => {
    setItem(cartItems.find((x) => x.id === id));
  }, [cartItems, id]);

  //Returns 1 product with some of it's details
  return (
    <div className="col-9 mx-auto col-md-6 col-lg-3 my-3 productwrapper">
      <div className="card" data-cy="painting">
        <div className="img-container p-5">
          <Link to={`details/${id}`}>
            <img
              src={img}
              alt="store"
              className="navbar-brand"
              height="300px"
              data-cy="painting_img"
            />
          </Link>
          <button
            className={item ? "cart-btn-inCart" : "cart-btn"}
            disabled={item ? true : false}
            onClick={addToCartS}
            data-cy="painting_inCart_btn"
          >
            {item ? (
              <p className="inCart text-capitalized mb-0" disabled>
                In Cart
              </p>
            ) : (
              <i className="fas fa-cart-plus" />
            )}
          </button>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <p data-cy="painting_name" className="align-self-center mb-0 desc">
            {name}
          </p>
          <h5 data-cy="painting_price" className="text-blue font-italic mb-0">
            <span className="mr-1">€</span>
            {price}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Product;
