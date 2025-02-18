const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Konfigurasi PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Konfigurasi CORS agar hanya menerima request dari frontend
const allowedOrigins = [
  "http://localhost:5174",
  "https://2955-114-10-149-234.ngrok-free.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());

const USERS_API = "https://2955-114-10-149-234.ngrok-free.app/users";

// Endpoint login dengan database
app.get('/login', async (req, res) => {
  const { nis, password } = req.body;

  try {
    // Cek apakah user dengan NIS tersebut ada di database
    const user = await pool.query('SELECT * FROM users WHERE nis = $1', [nis]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'NIS atau password salah' });
    }

    // Ambil password yang sudah di-hash dari database
    const hashedPassword = user.rows[0].password;

    // Bandingkan password yang dikirim dengan yang ada di database
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'NIS atau password salah' });
    }

    // Jika login sukses, kirim data user (tanpa password)
    res.json({
      user_id: user.rows[0].user_id,
      nis: user.rows[0].nis,
      email: user.rows[0].email,
      phone_number: user.rows[0].phone_number,
      kelas: user.rows[0].kelas
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
