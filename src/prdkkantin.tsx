import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";
import "./homepage.css";
import "./prdkkantin.css";

// Import gambar
import kantinHeader from "./assets/kantin.jpg";
import gorengKentang from "./assets/ayam.jpg";
import milkshake from "./assets/donat.jpg";
import ayamGeprek from "./assets/martabak.jpg";
import ayamKrispi from "./assets/oreo.jpg";

const products = [
  {
    id: 1,
    name: "Burger Burgar",
    description: "Steak Burger with Homemade Sauce, Freshly Fresh Veggies",
    price: 20000,
    image: gorengKentang
  },
  {
    id: 2,
    name: "French Fries",
    description: "Golden Fries With Homemade Dip And Fresh Toppings",
    price: 25000,
    image: milkshake
  },
  {
    id: 3,
    name: "Hot Dog",
    description: "Steamed Hot Dog with Homemade Sauce and Premium Toppings",
    price: 30000,
    image: ayamGeprek
  },
  {
    id: 4,
    name: "MilkShake",
    description: "Freshly Blended with Premium Flavors",
    price: 20000,
    image: ayamKrispi
  }
];

const PrdkKantinPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="prdkkantin-container">
      <header className="prdkkantin-header">
        <IoArrowBack className="back-icon" onClick={() => navigate("/kantin")} />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="kantin-banner">
        <img src={kantinHeader} alt="Kantin Op4t" className="banner-image" />
        <div className="banner-content">
          <h1>Kantin Op4t</h1>
        </div>
      </div>

      <div className="menu-grid">
        <div className="menu-images">
          <img src={gorengKentang} alt="Menu 1" />
          <img src={milkshake} alt="Menu 2" />
          <img src={ayamGeprek} alt="Menu 3" />
          <img src={ayamKrispi} alt="Menu 4" />
        </div>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price">Rp. {product.price.toLocaleString()}</div>
            </div>
            <button className="add-button">+</button>
          </div>
        ))}
      </div>

      <div className="new-card">
        <h3>
          <IoHome onClick={() => navigate("/homepage")} style={{ cursor: "pointer" }} />
          <FiMessageSquare onClick={() => navigate("/msgpage")} style={{ cursor: "pointer" }} />
          <IoCartOutline />
          <MdHistory />
          <CgProfile />
        </h3>
      </div>
    </div>
  );
};

export default PrdkKantinPage;
