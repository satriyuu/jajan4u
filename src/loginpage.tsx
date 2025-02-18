import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import smkn4Logo from "./assets/smkn4.png";
import eyeIcon from "./assets/eye.png";
import showIcon from "./assets/show.png";
import Loading from "./loadingpage"; // Pastikan file ini ada

const App: React.FC = () => {
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true); // Set awal loading true
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Efek loading saat pertama kali buka halaman (2 detik)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Tampilkan loading saat login

    try {
      const response = await axios.get("https://52bd-114-10-146-138.ngrok-free.app/users", {
        nis,
        password,
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/homepage");
      } else {
        setErrorMessage("Login gagal. Periksa NIS/NIP & password.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false); // Matikan loading setelah login selesai
    }
  };

  return (
    <div style={styles.container}>
      {loading && <Loading />} {/* Loading tampil saat pertama kali buka atau login */}
      {!loading && (
        <>
          <nav style={styles.navbar}>
            <h1 style={styles.navTitle}>LOGIN</h1>
          </nav>
          <div style={styles.cardContainer}>
            <img src={smkn4Logo} alt="SMKN 4 Logo" style={styles.logo} />
            <div style={styles.card}>
              <h2 style={styles.title}>LOGIN</h2>
              <form style={styles.form} onSubmit={handleLogin}>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="NIS/NIP"
                    style={styles.input}
                    value={nis}
                    onChange={(e) => setNis(e.target.value)}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <div style={styles.passwordWrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      style={styles.input}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <img
                      src={showPassword ? eyeIcon : showIcon}
                      alt="Toggle Password"
                      style={styles.eyeIcon}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
                {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}
                <button type="submit" style={styles.button}>LOGIN</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { backgroundColor: "#ffffff", minHeight: "100vh" },
  navbar: { backgroundColor: "transparent", padding: "1rem" },
  navTitle: { margin: 0, fontSize: "1.5rem", color: "#000", fontWeight: "bold" },
  cardContainer: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" },
  logo: { width: "180px", height: "180px", marginBottom: "1rem" },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
    width: "100%",
    maxWidth: "400px",
    margin: "2rem auto",
  },
  title: { marginBottom: "1.5rem", color: "#000", textAlign: "center", fontSize: "2rem", fontWeight: "bold" },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "1rem" },
  input: { width: "100%", padding: "0.75rem", border: "1px solid #ccc", borderRadius: "25px", fontSize: "1rem" },
  passwordWrapper: { position: "relative", width: "100%" },
  eyeIcon: { position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", width: "24px", height: "24px" },
  button: { padding: "0.75rem", backgroundColor: "#0A66A0", color: "#fff", border: "none", borderRadius: "25px", fontSize: "1rem", cursor: "pointer" },
  errorText: { color: "red", textAlign: "center", marginTop: "1rem" },
};

export default App;
