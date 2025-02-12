import React, { useState, useEffect } from 'react';
import './keranjang.css';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import logo from './assets/4 - Copy.png';
import Loading from "./loadingpage";

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

interface CheckoutFormData {
  nama: string;
  kelas: string;
  ruangan: string;
  metode: string;
  bayar: string;
  pesan: string;
}

const Keranjang: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Burger Burgar",
      price: 30000,
      quantity: 1,
      description: "Deskripsi toko",
      image: "./src/assets/burger.jpg",
      store: "Kantin Op4t",
      checked: false
    },
    {
      id: 2,
      name: "Risoles Mamayo",
      price: 5000,
      quantity: 1,
      description: "Deskripsi toko",
      image: "./src/assets/risol.jpg",
      store: "Koperasi Op4t",
      checked: false
    }
  ]);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    nama: '',
    kelas: '',
    ruangan: '',
    metode: '',
    bayar: '',
    pesan: ''
  });

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const updateQuantity = (id: number, increment: boolean) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1)
        };
      }
      return item;
    }));
  };

  const handleStoreCheck = (store: string, checked: boolean) => {
    setCartItems(cartItems.map(item => {
      if (item.store === store) {
        return { ...item, checked };
      }
      return item;
    }));
  };

  const handleItemCheck = (id: number, checked: boolean) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, checked };
      }
      return item;
    }));
  };

  const total = cartItems
    .filter(item => item.checked)
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkedItemsCount = cartItems.filter(item => item.checked).length;
  const isCheckoutDisabled = checkedItemsCount === 0;

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleCloseForm = () => {
    setShowCheckoutForm(false);
  };

  const handleFormSubmit = () => {
    // Filter out checked items
    setCartItems(cartItems.filter(item => !item.checked));
    setShowCheckoutForm(false);
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="keranjang-container">
      <div className="header">
        <Link to="/homepage" className="back-button">
          <IoArrowBack />
        </Link>
        <img src={logo} alt="Logo" className="header-logo" />
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tidak ada item yang ditambahkan.</p>
          </div>
        ) : (
          Object.entries(groupByStore(cartItems)).map(([store, items]) => {
            const allStoreItemsChecked = items.every(item => item.checked);
            
            return (
              <div key={store} className="store-section">
                <div className="store-header">
                  <input 
                    type="checkbox" 
                    className="store-checkbox"
                    checked={allStoreItemsChecked}
                    onChange={(e) => handleStoreCheck(store, e.target.checked)}
                  />
                  <span className="store-name">{store}</span>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <input 
                      type="checkbox" 
                      className="item-checkbox"
                      checked={item.checked}
                      onChange={(e) => handleItemCheck(item.id, e.target.checked)}
                    />
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <p className="item-price">Rp. {item.price.toLocaleString()}</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, false)}>
                        <IoRemoveCircleOutline />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, true)}>
                        <IoAddCircleOutline />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>

      <div className="checkout-section">
        <div className="total">
          <span>Total ({checkedItemsCount} produk):</span>
          <span>Rp.{total.toLocaleString()}</span>
        </div>
        <button 
          className={`checkout-button ${isCheckoutDisabled ? 'disabled' : ''}`}
          disabled={isCheckoutDisabled}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>

      {showCheckoutForm && (
        <div className="checkout-form-overlay">
          <div className="checkout-form">
            <div className="form-header">
              <h2>Check Out Form</h2>
              <button className="close-button" onClick={handleCloseForm}>×</button>
            </div>
            
            <div className="form-content">
              <div className="form-left">
                <div className="form-group">
                  <label>Nama</label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Kelas</label>
                  <select 
                    value={formData.kelas}
                    onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  >
                    <option value="" disabled className="default-option">Kelas</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Ruangan</label>
                  <select
                    value={formData.ruangan}
                    onChange={(e) => setFormData({...formData, ruangan: e.target.value})}
                  >
                    <option value="" disabled className="default-option">Ruangan</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Metode</label>
                  <select
                    value={formData.metode}
                    onChange={(e) => setFormData({...formData, metode: e.target.value})}
                  >
                    <option value="" disabled className="default-option">Metode</option>
                    <option value="ambil">Ambil</option>
                    <option value="antar">Antar + 1.000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Bayar</label>
                  <select
                    value={formData.bayar}
                    onChange={(e) => setFormData({...formData, bayar: e.target.value})}
                  >
                    <option value="" disabled className="default-option">Metode</option>
                    <option value="tunai">Tunai</option>
                    <option value="non-tunai">Non Tunai</option>
                  </select>
                </div>
              </div>

              <div className="form-right">
                <div className="form-group pesan-group">
                  <label>Pesan</label>
                  <textarea
                    value={formData.pesan}
                    onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="form-footer">
              <div className="total-amount">
                Total ({checkedItemsCount} produk): 
                Rp.{total.toLocaleString()}
                {formData.metode === 'antar' && ' + Rp.1.000 = Rp.' + (total + 1000).toLocaleString()}
              </div>
              <button className="checkout-submit" onClick={handleFormSubmit}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="notification-overlay">
          <div className="notification">
            <div className="notification-icon">✓</div>
            <div className="notification-message">
              Item berhasil di check out!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function groupByStore(items: CartItem[]) {
  return items.reduce((groups: { [key: string]: CartItem[] }, item) => {
    const store = item.store;
    if (!groups[store]) {
      groups[store] = [];
    }
    groups[store].push(item);
    return groups;
  }, {});
}

export default Keranjang;
