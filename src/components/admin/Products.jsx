import "../../css/admin/productList.css";
import { usePaintings } from "../../context/PaintingProvider";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar";

export default function Products() {
  const { paintings } = usePaintings();
  // Gives a list with all the products in the database
  return (
    <>
      <Sidebar />
      <div className="box-admin-pages">
        <div className="container-table-painting">
        <h2 className="mb-4">All Products</h2>
          <ul className="responsive-table-painting">
            <li className="table-header">
              <div className="col col-1">Nr.</div>
              <div className="col col-2">Name</div>
              <div className="col col-3">Image</div>
              <div className="col col-4">Type</div>
              <div className="col col-5">Price</div>
            </li>
            {paintings &&
              paintings.map((p, index) => (
                <li className="container-order-items" key={p.id}>
                  <div className="col col-1" data-label="Nr">
                    {index + 1}
                  </div>
                  <div className="col col-2" data-label="Name">
                    {p.name}
                  </div>
                  <div className="col col-3" data-label="Image">
                    <img src={p.img} alt="" />
                  </div>
                  <div className="col col-4" data-label="Type">
                    {p.type}
                  </div>
                  <div
                    className="col col-5"
                    data-label="Price"
                  >{`€ ${p.price}`}</div>
                  <div className="col col-6" data-label="">
                    {
                      <Link
                        className="edit"
                        to={`/addPaintingForm/${p.id}`}
                        data-cy="editPainting-btn"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                    }
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
