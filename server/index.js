const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { v1: uuidv1 } = require("uuid");
const bcrypt = require("bcrypt");
const { connect } = require("getstream");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
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

    res
      .status(200)
      .json({ username, password, userId, hashedPassword, userToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
