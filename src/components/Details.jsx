import { useEffect, useCallback, useState } from "react";
import { usePaintings } from "../context/PaintingProvider";
import { useParams, useHistory } from "react-router-dom";
import "../css/details.css";
import Swal from "sweetalert2";
import { addToCart } from "../context/cartAction";
import { useDispatch, useSelector } from "react-redux";

export default function Details(props) {
  const { id } = useParams();
  const { deletePainting, setPaintingToUpdate, currentPainting } =
    usePaintings();
  const [item, setItem] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  //Sets the admin state to true or false
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      if (userInfo.user.roles.includes("admin")) {
        setAdmin(true);
      }
    } else {
      setAdmin(false);
    }
  }, [setAdmin, userInfo]);

  //Triggers a Swal (a pop-up screen) and when clicked in the delete button
  //it deletes a product
  const handleRemove = useCallback(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your painting has been deleted.", "success");
        deletePainting(id);
        history.push("/products");
      }
    });
  }, [deletePainting, id, history]);

  useEffect(() => {
    setPaintingToUpdate(id);
  }, [id, setPaintingToUpdate, currentPainting]);

  //This triggers when "Add To Cart" is clicked
  useEffect(() => {
    setItem(cartItems.find((x) => x.id === id));
  }, [cartItems, id]);

  //Adds an item to the cart
  const addToCartS = () => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  //Gives a view of the details from a product
  return (
    <>
      {currentPainting && (
        <div className="container-details">
          <div className="row-details">
            <div className="details-box-details">
              <div className="details">
                <h2>Noëlla Nechelput</h2>
                <h1>{currentPainting.name}</h1>
                <h5>Type: {currentPainting.type}</h5>
                <h3>€ {currentPainting.price}</h3>
                <h4>Size: {currentPainting.size}</h4>
                <p>{currentPainting.description}</p>
                <div className="buttons">
                  <button
                    data-cy="addToCart-btn"
                    disabled={item ? true : false}
                    className="add"
                    onClick={addToCartS}
                  >
                    {item ? "In Cart" : "Add To Cart"}
                  </button>
                  {admin && (
                    <>
                      <button
                        className="remove mx-2"
                        onClick={handleRemove}
                        data-cy="deletePainting-btn"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="img-box-details">
              <img
                src={currentPainting.img}
                alt="paintings"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
