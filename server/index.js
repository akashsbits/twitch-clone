const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { v1: uuidv1 } = require("uuid");
const bcrypt = require("bcrypt");
const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a unique user id
    const userId = uuidv1();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Instantiate a new client (server side)
    const client = connect(
      process.env.API_KEY,
      process.env.API_KEY_SECRET,
      process.env.APP_ID
    );
    // Create a token for user with id i.e. userId
    const userToken = client.createUserToken(userId);

    res.status(200).json({ username, userId, hashedPassword, userToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Instantiate a new client (server side)
    const client = connect(
      process.env.API_KEY,
      process.env.API_KEY_SECRET,
      process.env.APP_ID
    );

    // Instantiate a new client (server side)
    const chatClient = StreamChat.getInstance(
      process.env.API_KEY,
      process.env.API_KEY_SECRET
    );

    // Query all users
    const { users } = await chatClient.queryUsers({ name: username });

    if (!users.length) return res.status(400).json({ msg: "User not found" });

    // Compare password
    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const userId = users[0].id;

    // Create a new token for the existing user
    const userToken = client.createUserToken(userId);

    const confirmName = users[0].name;
    const hashedPassword = users[0].hashedPassword;

    if (success) {
      return res
        .status(200)
        .json({ username: confirmName, userId, hashedPassword, userToken });
    } else {
      return res.status(500).json({ msg: "Login failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
