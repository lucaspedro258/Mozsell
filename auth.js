const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hash });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

// login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;