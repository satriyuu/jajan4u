import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { IoFastFood, IoWater } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import "./prdkkantin.css";

// Import gambar
import kantinHeader from "./assets/kantin.jpg";
import gorengKentang from "./assets/ayam.jpg";
import milkshake from "./assets/donat.jpg";
import ayamGeprek from "./assets/martabak.jpg";
import ayamKrispi from "./assets/oreo.jpg";
import menuIcon from "./assets/menu.png";
import searchIcon from "./assets/search.png";
import logo from "./assets/4 - Copy.png";

interface MenuItem {
  menu_id: number;
  seller_id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
}

// Tambahkan interface
interface ProfileCardProps {
  onClose: () => void;
}

interface HistoryCardProps {
  onClose: () => void;
}

// Tambahkan interface CartItem
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

const PrdkKantinPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sellerId, storeName, isMultiSeller } = location.state || { 
    sellerId: 10, 
    storeName: "Kantin Op4t",
    isMultiSeller: false 
  };
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
        if (isMultiSeller && Array.isArray(sellerId)) {
          const promises = sellerId.map(id => 
            fetch(`https://52bd-114-10-146-138.ngrok-free.app/menu/${id}`)
              .then(res => res.json())
          );
          const results = await Promise.all(promises);
          const combinedMenus = results.flat();
          setMenuItems(combinedMenus);
          setFilteredMenuItems(combinedMenus);
        } else {
          const response = await fetch(`https://52bd-114-10-146-138.ngrok-free.app/menu/${sellerId}`);
          const data = await response.json();
          setMenuItems(data);
          setFilteredMenuItems(data);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [sellerId, isMultiSeller]);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterItems(query, activeFilter);
  };

  const handleFilter = async (type: 'all' | 'food' | 'drink') => {
    setActiveFilter(type);
    setLoading(true);

    try {
      if (type === 'all') {
        // Jika filter 'all', gunakan data yang sudah ada
        if (isMultiSeller && Array.isArray(sellerId)) {
          const promises = sellerId.map(id => 
            fetch(`https://52bd-114-10-146-138.ngrok-free.app/menu/${id}`)
              .then(res => res.json())
          );
          const results = await Promise.all(promises);
          const combinedMenus = results.flat();
          setFilteredMenuItems(combinedMenus);
        } else {
          const response = await fetch(`https://52bd-114-10-146-138.ngrok-free.app/menu/${sellerId}`);
          const data = await response.json();
          setFilteredMenuItems(data);
        }
      } else {
        // Gunakan endpoint filter baru
        const filterValue = type === 'food' ? 1 : 2;
        // Fetch sekali saja dari endpoint filter
        const response = await fetch(`https://52bd-114-10-146-138.ngrok-free.app/menu/filter/${filterValue}`);
        const data = await response.json();
        
        // Filter berdasarkan sellerId
        if (isMultiSeller && Array.isArray(sellerId)) {
          const filteredBySeller = data.filter(item => 
            sellerId.includes(item.seller_id)
          );
          setFilteredMenuItems(filteredBySeller);
        } else {
          const filteredBySeller = data.filter(item => 
            item.seller_id === sellerId
          );
          setFilteredMenuItems(filteredBySeller);
        }
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

    // Filter berdasarkan kategori
    if (filter !== 'all') {
      filtered = filtered.filter(item => {
        const isFood = item.name.toLowerCase().match(/nasi|ayam|mie|bakso|soto|sate|gorengan|roti|burger/);
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

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = (product: any) => {
    // Ambil data keranjang yang ada dari localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Cek apakah produk sudah ada di keranjang
    const existingItemIndex = existingCart.findIndex(
      (item: CartItem) => item.id === product.id
    );

    let newCart;
    if (existingItemIndex >= 0) {
      // Jika produk sudah ada, tambah quantity
      newCart = existingCart.map((item: CartItem, index: number) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      // Jika produk belum ada, tambahkan sebagai item baru
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        description: product.description,
        image: product.image,
        store: "Kantin Op4t",
        checked: false
      };
      newCart = [...existingCart, newItem];
    }

    // Simpan keranjang yang sudah diupdate ke localStorage
    localStorage.setItem('cart', JSON.stringify(newCart));

    // Tampilkan notifikasi
    alert('Produk berhasil ditambahkan ke keranjang!');
  };

  return (
    <div className="prdkantin-page">
      <div className="prdkantin-topbar">
        <div className="prdkantin-left">
          <IoArrowBack className="prdkantin-back" onClick={() => navigate("/kantin")} />
          <img src={logo} alt="Logo" className="prdkantin-logo" />
        </div>
        <div className="prdkantin-search-container">
          <img src={menuIcon} alt="Menu Icon" className="prdkantin-menu-icon" />
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="prdkantin-search"
          />
          <img src={searchIcon} alt="Search Icon" className="prdkantin-search-icon" />
        </div>
      </div>

      <div className="prdkantin-header">
        <img src={kantinHeader} alt="Kantin" className="prdkantin-banner" />
      </div>

      <div className="prdkantin-title-card">
        <div className="prdkantin-title-content">
          <img src={kantinHeader} alt="Kantin Icon" className="prdkantin-icon" />
          <h1>{storeName}</h1>
        </div>
      </div>

      <div className="prdkantin-recommendations">
        <div className="recommendations-grid">
          {recommendedItems.map((item) => (
            <div key={item.menu_id} className="polaroid-card">
              <div className="polaroid-image">
                <img src={item.image || ''} alt={item.name} />
              </div>
              <div className="polaroid-caption">
                <h3>{item.name}</h3>
                <p>Rp. {item.price}</p>
                <IoAdd 
                  className="polaroid-add-btn" 
                  onClick={() => addToCart(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tambahkan div kosong untuk spacing */}
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
            Makanan
            <span className="filter-count">{getFoodCount()}</span>
          </button>
          <button 
            className={`filter-button ${activeFilter === 'drink' ? 'active' : ''}`}
            onClick={() => handleFilter('drink')}
          >
            <IoWater />
            Minuman
            <span className="filter-count">{getDrinkCount()}</span>
          </button>
        </div>
      </div>

      <div className="prdkantin-list">
        {loading ? (
          <div className="loading">Memuat menu...</div>
        ) : filteredMenuItems.length === 0 ? (
          <div className="no-results">Tidak ada menu yang sesuai dengan pencarian</div>
        ) : (
          filteredMenuItems.map((item) => (
            <div key={item.menu_id} className="prdkantin-item">
              <div className="prdkantin-content">
                <img 
                  src={item.image || kantinHeader} 
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
                  image: item.image || kantinHeader
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
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/homepage" ? "#FFD700" : "white" 
            }} 
          />
          <FiMessageSquare 
            onClick={() => navigate("/msgpage")} 
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/msgpage" ? "#FFD700" : "white" 
            }} 
          />
          <IoCartOutline 
            onClick={() => navigate("/keranjang")}
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/keranjang" ? "#FFD700" : "white" 
            }} 
          />
          <MdHistory 
            onClick={toggleHistoryPopup}
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/history" ? "#FFD700" : "white" 
            }} 
          />
          <CgProfile 
            onClick={toggleProfilePopup}
            style={{ 
              cursor: "pointer",
              color: location.pathname === "/profile" ? "#FFD700" : "white" 
            }} 
          />
        </h3>
      </div>

      {isProfileOpen && (
        <ProfileCard onClose={toggleProfilePopup} />
      )}

      {isHistoryOpen && (
        <HistoryCard onClose={toggleHistoryPopup} />
      )}
    </div>
  );
};

// Tambahkan komponen ProfileCard
const ProfileCard = ({ onClose }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-pic">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span>Profile</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="profile-content">
        <div className="profile-item">
          <span className="profile-label">Nama lengkap</span>
          <span className="profile-value">Raka Pratama Domingoz</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Nomor ponsel</span>
          <span className="profile-value">(+62) 12345678</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">NIS</span>
          <span className="profile-value">2223119599</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Alamat email</span>
          <span className="profile-value">rakaprtmd@example.com</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Jenis kelamin</span>
          <span className="profile-value">Laki-laki</span>
        </div>
        <button className="sign-out-btn">Sign Out</button>
      </div>
    </div>
  );
};

// Tambahkan komponen HistoryCard
const HistoryCard = ({ onClose }: HistoryCardProps) => {
  return (
    <div className="history-card">
      <div className="history-header">
        <div className="history-icon">
          <MdHistory />
        </div>
        <span>Aktifitas</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="history-content">
        <div className="history-item">
          <div className="history-item-icon">
            <img src={gorengKentang} alt="Kantin" />
          </div>
          <div className="history-details">
            <div className="history-title">Kantin Op4t - Burger Burgar</div>
            <div className="history-date">17 Januari 2025, 10:05</div>
          </div>
          <div className="history-amount">1 x Rp. 30.000</div>
        </div>

        <div className="history-item">
          <div className="history-item-icon">
            <img src={ayamKrispi} alt="Koperasi" />
          </div>
          <div className="history-details">
            <div className="history-title">Koperasi Op4t - Risoles Mamayo</div>
            <div className="history-date">17 Januari 2025, 10:25</div>
          </div>
          <div className="history-amount">1 x Rp. 5.000</div>
        </div>
      </div>
    </div>
  );
};

export default PrdkKantinPage;
