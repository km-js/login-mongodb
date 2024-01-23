import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/logindb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectDB();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// Routes
// app.get("/login", (req, res) => {
//   res.send("My API");
// });

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (password === existingUser.password) {
        res.send({ message: "Login Successful", user: existingUser });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Internal server error during login');
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({ message: "User already registered" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.send({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).send('Internal server error during registration');
  }
});

const PORT = 9002;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
