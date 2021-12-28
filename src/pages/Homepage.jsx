import React from "react";
import "../css/homepage.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="body-home" id="top">
      <div className="line"></div>
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="header">
        <div className="header-text">
          <div className="main">
            <div className="main-text">Noëlla</div>
            <ul className="main-option">
              <li>
                <span>Nechelput</span>
              </li>
            </ul>
          </div>
          <h2>"Art is not what you see, but what you make others see."</h2>
          <Link to="/products" className="none my-4">
            <button className="noselect">
              <span className="text">Explore more</span>
              <span className="icon">
                <i className="fas fa-arrow-right"></i>
              </span>
            </button>
          </Link>
        </div>
        <div className="header-svg">
          <img src="../img/PaintBrush.jpg" alt="Painting" />
        </div>
      </div>
      <div className="row1-container">
        <div className="box-home box-down cyan">
          <h2>Art on Textile</h2>
          <p>
            A wide variety of paintings where I paint on textile to make the art
            come to life
          </p>
          <img
            src="https://assets.codepen.io/2301174/icon-supervisor.svg"
            alt=""
          />
        </div>

        <div className="box-home red">
          <h2>Art on Fabric</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            accusantium!
          </p>
          <img
            src="https://assets.codepen.io/2301174/icon-team-builder.svg"
            alt=""
          />
        </div>

        <div className="box-home box-down blue">
          <h2>Ceramic</h2>
          <p>Besides painting I also make ceramic art as a hobby</p>
          <img
            src="https://assets.codepen.io/2301174/icon-calculator.svg"
            alt=""
          />
        </div>
      </div>
      <div className="row2-container">
        <div className="box-home orange">
          <h2>Drip Paint</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            error, voluptate dolorum reiciendis magnam voluptates!
          </p>
          <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
