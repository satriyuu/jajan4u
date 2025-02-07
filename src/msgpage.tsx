import React, { useState, useEffect } from "react";
import { AiOutlineSetting } from "react-icons/ai"; // Icon untuk setting
import { FiArrowLeft } from "react-icons/fi"; // Icon untuk kembali
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CgProfile } from "react-icons/cg"; // Icon untuk avatar
import { IoMdSend } from "react-icons/io"; // Icon untuk tombol kirim
import Loading from "./loadingpage"; // Import komponen loading
import "./msgpage.css";

interface Contact {
  name: string;
  status: string;
}

const contacts: Contact[] = [
  { name: "Jhon", status: "Online" },
  { name: "Lip", status: "Online" },
  { name: "Deni", status: "Offline" },
  { name: "Madam", status: "Online" },
  { name: "Peter", status: "Offline" },
  { name: "Lisa", status: "Offline" },
];

const MsgPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    navigate("/homepage");
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="msgpage-container">
      {/* Navbar */}
      <div className="msgpage-navbar">
        <div className="msgpage-navbar-left">
          <FiArrowLeft className="msgpage-navbar-icon" onClick={handleBackClick} />
        </div>
        <div className="msgpage-navbar-right">
          <AiOutlineSetting className="msgpage-navbar-icon" />
        </div>
      </div>

      {/* Konten Utama */}
      <div className="msgpage-content">
        {/* Section Kontak */}
        <div className="msgpage-contacts">
          <div className="msgpage-search">
            <input
              type="text"
              placeholder="Cari kontak"
              className="msgpage-search-input"
            />
          </div>
          <ul className="msgpage-contact-list">
            {contacts.map((contact, index) => (
              <li
                key={index}
                className={`msgpage-contact-item ${
                  selectedContact?.name === contact.name ? "selected" : ""
                }`}
                onClick={() => handleContactClick(contact)}
              >
                <CgProfile className="msgpage-contact-avatar-icon" />
                <div className="msgpage-contact-info">
                  <p className="msgpage-contact-name">{contact.name}</p>
                  <p
                    className={`msgpage-contact-status ${contact.status.toLowerCase()}`}
                  >
                    {contact.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Section Chat */}
        <div className="msgpage-chat">
          {selectedContact ? (
            <div className="msgpage-chat-details">
              <div className="msgpage-chat-header">
                <CgProfile className="msgpage-chat-avatar-icon" />
                <div className="msgpage-chat-info">
                  <p className="msgpage-chat-name">{selectedContact.name}</p>
                  <p
                    className={`msgpage-chat-status ${selectedContact.status.toLowerCase()}`}
                  >
                    {selectedContact.status}
                  </p>
                </div>
              </div>
              <div className="msgpage-chat-body">
                <p>Ini adalah awal percakapan Anda dengan {selectedContact.name}.</p>
              </div>
              <div className="msgpage-chat-input-container">
                <input
                  type="text"
                  placeholder="Ketik pesan"
                  className="msgpage-chat-input"
                />
                <button className="msgpage-chat-send-btn">
                  <IoMdSend className="msgpage-chat-send-icon" />
                </button>
              </div>
            </div>
          ) : (
            <p>Pilih kontak untuk memulai percakapan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MsgPage;
