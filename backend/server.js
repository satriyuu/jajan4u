const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Konfigurasi CORS agar hanya menerima request dari frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://87f0-114-10-148-241.ngrok-free.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());

const USERS_API = "https://87f0-114-10-148-241.ngrok-free.app/users";

// Endpoint login
app.post("/api/login", async (req, res) => {
  try {
    const { nis, password } = req.body;

    // Ambil data user dari API ngrok
    const response = await axios.get(USERS_API);
    const users = response.data; // Data berupa array objek

    // Cari user berdasarkan NIS dan password
    const user = users.find((u) => u.nis === nis && u.password === password);

    if (user) {
      res.json({
        message: "Login berhasil!",
        user: {
          user_id: user.user_id,
          nis: user.nis,
          role: user.role,
          email: user.email,
          phone_number: user.phone_number,
          kelas: user.kelas, // Pastikan nama field sesuai dengan API
        },
      });
    } else {
      res.status(401).json({ message: "Login gagal, periksa NIS & password." });
    }
  } catch (error) {
    console.error("Error saat login:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
