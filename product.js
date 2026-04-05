const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// 🔥 CRIAR PRODUTO
router.post("/", auth, async (req, res) => {
  const { title, price, description } = req.body;

  const product = new Product({
    title,
    price,
    description,
    ownerId: req.user.id
  });

  await product.save();

  res.send("Produto criado");
});


// 📦 LISTAR TODOS PRODUTOS
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});


// 👤 PRODUTOS DO USUÁRIO
router.get("/my", auth, async (req, res) => {
  const products = await Product.find({ ownerId: req.user.id });
  res.json(products);
});

module.exports = router;