import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/orders.css";
import { useDispatch } from "react-redux";
import { removeFromCart, removeAllFromCart } from "../context/cartAction";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { useOrders } from "../context/OrderProvider";
import { useHistory } from "react-router-dom";

const OrderList = () => {
  const { createOrUpdateOrder } = useOrders();
  const cart = useSelector((state) => state.cart);
  const { cartItems, loading } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const history = useHistory();

  //Calculates the total price from the items in the cart
  useEffect(() => {
    const amount = cartItems
      .map((item) => item.price)
      .reduce((acc, result) => {
        acc += parseFloat(result);
        return acc;
      }, 0);
    setTotal(amount);
  }, [cartItems, setTotal]);

  //Removes all items from the cart
  const removeAllItems = useCallback(async () => {
    dispatch(removeAllFromCart());
  }, [dispatch]);

  //Removes 1 item from teh cart
  const handleRemove = useCallback(
    (ind) => {
      const id = cartItems[ind].id;
      dispatch(removeFromCart(id));
    },
    [dispatch, cartItems]
  );

  //Makes an order
  const handleCheckout = useCallback(async () => {
    const paintings = cartItems;
    const userId = userInfo.user.id;
    if (paintings.length !== 0) {
      await createOrUpdateOrder({
        paintings,
        user_id: userId,
        total,
      });
      dispatch(removeAllFromCart());
      history.push("/myorders");
    }
  }, [cartItems, createOrUpdateOrder, total, userInfo, history, dispatch]);

  if (loading) return (
    <div className="container">
        <div className="col-10 mx-auto my-2 text-center text-title">
          <h1 className="text-capitalize font-weight-bold title my-4" data-cy="loading">Loading...</h1>
        </div>
    </div>
    );

  //Shows the current items that are in the cart
  return (
    <>
      <div className="container-table">
        <ul className="responsive-table">
          <div className="total-and-btn">
            <div className="amount">Total: € {total}</div>
            <button onClick={removeAllItems} className="clear-btn-order">
              Remove All <IoIcons.IoMdRemoveCircleOutline color="#fff" />
            </button>
          </div>
          <li className="table-header">
            <div className="col col-1">Product Name</div>
            <div className="col col-2">Image</div>
            <div className="col col-3">Type</div>
            <div className="col col-4">Price</div>
          </li>
          {cartItems.map((p, index) => (
            <li className="container-order-items" key={p.id}>
              <div className="col col-1" data-label="Product Name">
                {p.name}
              </div>
              <div className="col col-2" data-label="Image">
                <img src={p.img} alt="paintings" className="img-fluid" />
              </div>
              <div className="col col-3" data-label="Type">
                {p.type}
              </div>
              <div className="col col-4" data-label="Price">
                {p.price}
              </div>
              <div className="col col-5" data-label="Delete">
                <button className="remove" onClick={() => handleRemove(index)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </li>
          ))}
          <button
            onClick={handleCheckout}
            className="checkout-btn"
            data-cy="checkout-btn"
          >
            Checkout <AiIcons.AiOutlineArrowRight color="#fff" />
          </button>
        </ul>
      </div>
    </>
  );
};

export default OrderList;
