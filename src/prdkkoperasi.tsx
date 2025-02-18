import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { IoFastFood, IoWater } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import "./prdkkoperasi.css";

// Import gambar
import koperasiHeader from "./assets/koperasi.jpeg";
import menuIcon from "./assets/menu.png";
import searchIcon from "./assets/search.png";
import logo from "./assets/4 - Copy.png";

// Import Loading component
import Loading from "./loadingpage";

interface MenuItem {
  menu_id: number;
  seller_id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  filter_makan: number;
}

interface ProfileCardProps {
  onClose: () => void;
}

interface HistoryCardProps {
  onClose: () => void;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  store: string;
  checked: boolean;
}

const PrdkKoperasiPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'drink'>('all');
  const [recommendedItems, setRecommendedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`https://7c9c-103-151-226-8.ngrok-free.app/menu/1`);
        const data = await response.json();
        setMenuItems(data);
        setFilteredMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const getRandomRecommendations = (items: MenuItem[], count: number) => {
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    if (menuItems.length > 0) {
      setRecommendedItems(getRandomRecommendations(menuItems, 4));
    }
  }, [menuItems]);

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleHistoryPopup = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const addToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(
      (item: CartItem) => item.id === product.id
    );

    let newCart;
    if (existingItemIndex >= 0) {
      newCart = existingCart.map((item: CartItem, index: number) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        description: product.description,
        image: product.image,
        store: "Koperasi",
        checked: false
      };
      newCart = [...existingCart, newItem];
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Produk berhasil ditambahkan ke keranjang!');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterItems(query, activeFilter);
  };

  const handleFilter = async (type: 'all' | 'food' | 'drink') => {
    setActiveFilter(type);
    setLoading(true);

    try {
      if (type === 'all') {
        const response = await fetch(`https://7c9c-103-151-226-8.ngrok-free.app/menu/1`);
        const data = await response.json();
        setFilteredMenuItems(data);
      } else {
        const filterValue = type === 'food' ? 1 : 2;
        const response = await fetch(`https://7c9c-103-151-226-8.ngrok-free.app/menu/filter/${filterValue}`);
        const data = await response.json();
        const filteredBySeller = data.filter((item: MenuItem) => 
          item.seller_id === 1
        );
        setFilteredMenuItems(filteredBySeller);
      }
    } catch (error) {
      console.error('Error fetching filtered items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = (query: string, filter: 'all' | 'food' | 'drink') => {
    let filtered = menuItems;

    // Filter berdasarkan pencarian
    if (query.trim() !== "") {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.description?.toLowerCase() || "").includes(query.toLowerCase())
      );
    }

    // Filter berdasarkan kategori untuk koperasi
    if (filter !== 'all') {
      filtered = filtered.filter(item => {
        const isFood = item.name.toLowerCase().match(/snack|makanan|roti|biskuit|keripik|wafer|coklat|permen/);
        return filter === 'food' ? isFood : !isFood;
      });
    }

    setFilteredMenuItems(filtered);
  };

  const getFoodCount = () => {
    return menuItems.filter(item => item.filter_makan === 1).length;
  };

  const getDrinkCount = () => {
    return menuItems.filter(item => item.filter_makan === 2).length;
  };

  // Tambahkan useEffect untuk loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Tambahkan kondisi loading di awal return
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="prdkantin-page">
      <div className="prdkantin-topbar">
        <div className="prdkantin-left">
          <IoArrowBack className="prdkantin-back" onClick={() => navigate("/homepage")} />
          <img src={logo} alt="Logo" className="prdkantin-logo" />
        </div>
        <div className="prdkantin-search-container">
          <img src={menuIcon} alt="Menu Icon" className="prdkantin-menu-icon" />
          <input
            type="text"
            placeholder="Cari produk koperasi..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="prdkantin-search"
          />
          <img src={searchIcon} alt="Search Icon" className="prdkantin-search-icon" />
        </div>
      </div>

      <div className="prdkantin-header">
        <img src={koperasiHeader} alt="Koperasi" className="prdkantin-banner" />
      </div>

      <div className="prdkantin-title-card">
        <div className="prdkantin-title-content">
          <img src={koperasiHeader} alt="Koperasi Icon" className="prdkantin-icon" />
          <h1>Koperasi Sekolah</h1>
        </div>
      </div>

      <div className="prdkantin-recommendations">
        <div className="recommendations-grid">
          {recommendedItems.map((item) => (
            <div key={item.menu_id} className="polaroid-card">
              <div className="polaroid-image">
                <img src={item.image || koperasiHeader} alt={item.name} />
              </div>
              <div className="polaroid-caption">
                <h3>{item.name}</h3>
                <p>Rp. {item.price}</p>
                <IoAdd 
                  className="polaroid-add-btn" 
                  onClick={() => addToCart({
                    id: item.menu_id,
                    name: item.name,
                    price: parseInt(item.price),
                    description: item.description || 'Tidak ada deskripsi',
                    image: item.image || koperasiHeader
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="spacing-div"></div>

      <div className="filter-container">
        <div className="filter-buttons">
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            <MdOutlineCategory />
            Semua
            <span className="filter-count">{menuItems.length}</span>
          </button>
          <button 
            className={`filter-button ${activeFilter === 'food' ? 'active' : ''}`}
            onClick={() => handleFilter('food')}
          >
            <IoFastFood />
            Makanan Ringan
            <span className="filter-count">{getFoodCount()}</span>
          </button>
          <button 
            className={`filter-button ${activeFilter === 'drink' ? 'active' : ''}`}
            onClick={() => handleFilter('drink')}
          >
            <IoWater />
            Minuman & Lainnya
            <span className="filter-count">{getDrinkCount()}</span>
          </button>
        </div>
      </div>

      <div className="prdkantin-list">
        {loading ? (
          <div className="loading">Memuat produk...</div>
        ) : filteredMenuItems.length === 0 ? (
          <div className="no-results">Tidak ada produk yang sesuai dengan pencarian</div>
        ) : (
          filteredMenuItems.map((item) => (
            <div key={item.menu_id} className="prdkantin-item">
              <div className="prdkantin-content">
                <img 
                  src={item.image || koperasiHeader} 
                  alt={item.name} 
                  className="prdkantin-img" 
                />
                <div className="prdkantin-info">
                  <h3 className="prdkantin-title">{item.name}</h3>
                  <p className="prdkantin-desc">
                    {item.description || 'Tidak ada deskripsi'}
                  </p>
                  <span className="prdkantin-price">
                    Rp. {parseInt(item.price).toLocaleString()}
                  </span>
                </div>
              </div>
              <IoAdd 
                className="prdkantin-add-btn" 
                onClick={() => addToCart({
                  id: item.menu_id,
                  name: item.name,
                  price: parseInt(item.price),
                  description: item.description || 'Tidak ada deskripsi',
                  image: item.image || koperasiHeader
                })}
              />
            </div>
          ))
        )}
      </div>

      <div className="new-card">
        <h3>
          <IoHome 
            onClick={() => navigate("/homepage")} 
            style={{ cursor: "pointer" }} 
          />
          <FiMessageSquare 
            onClick={() => navigate("/msgpage")} 
            style={{ cursor: "pointer" }} 
          />
          <IoCartOutline 
            onClick={() => navigate("/keranjang")}
            style={{ cursor: "pointer" }} 
          />
          <MdHistory 
            onClick={toggleHistoryPopup}
            style={{ cursor: "pointer" }} 
          />
          <CgProfile 
            onClick={toggleProfilePopup}
            style={{ cursor: "pointer" }} 
          />
        </h3>
      </div>
    </div>
  );
};

export default PrdkKoperasiPage;
