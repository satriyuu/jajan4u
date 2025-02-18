import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Loading from "./loadingpage";
import "./homepage.css";
import "./kantin.css";
import logo from "./assets/4 - Copy.png";
import menuIcon from "./assets/menu.png";
import searchIcon from "./assets/search.png";

// Import gambar
import kantinOp4t from "./assets/kantin.jpg";
import biEem from "./assets/kantin.jpg";
import pojokJajan from "./assets/kantin.jpg";
import tokoSekolah from "./assets/kantin.jpg";
import studentShop from "./assets/kantin.jpg";
import jajanCorner from "./assets/kantin.jpg";

// Import ProfileCard dan HistoryCard
interface ProfileCardProps {
  onClose: () => void;
}

interface HistoryCardProps {
  onClose: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClose }) => {
  return (
    <div className="profile-card">
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="profile-header">
        <div className="profile-icon">
          <CgProfile />
        </div>
        <span>Profile</span>
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

const HistoryCard: React.FC<HistoryCardProps> = ({ onClose }) => {
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
            <img src={kantinOp4t} alt="Kantin" />
          </div>
          <div className="history-details">
            <div className="history-title">Kantin Op4t - Burger Burgar</div>
            <div className="history-date">17 Januari 2025, 10:05</div>
          </div>
          <div className="history-amount">1 x Rp. 30.000</div>
        </div>
      </div>
    </div>
  );
};

interface Store {
  id: number;
  name: string;
  image: string;
  description: string;
  seller_id: number | number[];
}

const stores: Store[] = [
  {
    id: 1,
    name: "Kantin Ibu Kosim",
    image: kantinOp4t,
    description: "Tempat makan seru dengan berbagai pilihan makanan enak, cocok untuk istirahat siswa.",
    seller_id: 10
  },
  {
    id: 2,
    name: "Kantin Ibu Afikah",
    image: biEem,
    description: "Aneka gorengan dan minuman",
    seller_id: 8
  },
  {
    id: 3,
    name: "Kantin Ibu Iin",
    image: pojokJajan,
    description: "Tempat seru untuk camilan enak dan segar di setiap jam istirahat.",
    seller_id: 7
  },
  {
    id: 4,
    name: "Kantin Ibu Irma",
    image: tokoSekolah,
    description: "Tempat semua kebutuhan sekolah dengan harga bersahabat untuk siswa.",
    seller_id: 9
  },
  {
    id: 5,
    name: "Kantin Ibu Enok",
    image: studentShop,
    description: "Toko lengkap dengan semua kebutuhan siswa, praktis dan terjangkau.",
    seller_id: 13
  },
  {
    id: 6,
    name: "Kantin Ibu Lina",
    image: jajanCorner,
    description: "Sudut nyaman untuk jajan ringan yang selalu menggoda siswa.",
    seller_id: [5, 6]
  },
  {
    id: 8,
    name: "Kantin Pak Iwan",
    image: biEem,
    description: "Surga cemilan dengan berbagai pilihan snack lokal dan internasional.",
    seller_id: 4
  },
  {
    id: 9,
    name: "Kantin Pak Didi",
    image: pojokJajan,
    description: "Makanan rumahan yang lezat dengan harga terjangkau.",
    seller_id: 3
  },
  {
    id: 10,
    name: "Kantin Ibu Yuliani",
    image: tokoSekolah,
    description: "Minuman segar dan makanan ringan untuk energi sepanjang hari.",
    seller_id: 2
  },
  {
    id: 11,
    name: "Kantin Pak Atep",
    image: studentShop,
    description: "Menyajikan berbagai makanan khas nusantara yang autentik.",
    seller_id: 11
  },
  {
    id: 12,
    name: "Kantin Pak Maman",
    image: jajanCorner,
    description: "Kantin modern dengan sistem pemesanan digital.",
    seller_id: 12
  }
];

const KantinPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>(stores);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    // Filter toko berdasarkan input search
    if (query.trim() === "") {
      setFilteredStores(stores);
    } else {
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStores(filtered);
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Filter toko saat user menekan Enter
      if (searchQuery.trim() === "") {
        setFilteredStores(stores);
      } else {
        const filtered = stores.filter(store =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStores(filtered);
      }
    }
  };

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleHistoryPopup = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const navigateToMsgPage = () => {
    navigate("/msgpage");
  };

  const navigateToCart = () => {
    navigate("/keranjang");
  };

  const navigateToStore = (store: Store) => {
    if (Array.isArray(store.seller_id)) {
      navigate("/prdkkantin", { 
        state: { 
          sellerId: store.seller_id,
          storeName: store.name,
          isMultiSeller: true 
        } 
      });
    } else if (store.seller_id > 0) {
      navigate("/prdkkantin", { 
        state: { 
          sellerId: store.seller_id,
          storeName: store.name,
          isMultiSeller: false 
        } 
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="kantin-container">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="SuperMarket Logo" className="logo-image" />
        </div>
        <nav className="navbar">
          <form className="search-form">
            <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
            <input
              type="text"
              placeholder="Jajan apa hari ini?"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="search-input"
            />
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
          </form>
        </nav>
      </header>

      <div className="stores-grid">
        {filteredStores.map((store) => (
          <div 
            key={store.id} 
            className="store-card" 
            onClick={() => navigateToStore(store)}
            style={{ cursor: store.seller_id > 0 ? "pointer" : "default" }}
          >
            <img src={store.image} alt={store.name} className="store-image" />
            <div className="store-info">
              <h3>{store.name}</h3>
              <p>{store.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="navigatebar-card">
        <h3>
          <IoHome 
            onClick={() => navigate("/homepage")} 
            style={{ cursor: "pointer" }} 
          />
          <FiMessageSquare 
            onClick={navigateToMsgPage} 
            style={{ cursor: "pointer" }} 
          />
          <IoCartOutline 
            onClick={navigateToCart} 
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

      {isProfileOpen && (
        <ProfileCard onClose={toggleProfilePopup} />
      )}

      {isHistoryOpen && (
        <HistoryCard onClose={toggleHistoryPopup} />
      )}
    </div>
  );
};

export default KantinPage;
