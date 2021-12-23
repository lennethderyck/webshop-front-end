import React from "react";
import Product from "../components/Product";
import "../css/navbar.css";

export default function ProductLijst({ paintings }) {
  //returns the list of products
  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <div className="row">
            {paintings.map((p) => (
              <Product key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
