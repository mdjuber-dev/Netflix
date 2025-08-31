import express from "express";
import dotenv from "dotenv";

// .env file ke variables load karne ke liye
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// static files serve karna (public folder se)
app.use(express.static(process.cwd() + "/public"));

// Testing route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



app.get("/api/trailers", (req, res) => {
  res.json([
    {
      title: "Flixora Original 1",
      poster: "https://via.placeholder.com/200x300?text=Movie+1",
      trailer: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      title: "Flixora Original 2",
      poster: "https://via.placeholder.com/200x300?text=Movie+2",
      trailer: "https://www.w3schools.com/html/movie.mp4"
    }
  ]);
});
