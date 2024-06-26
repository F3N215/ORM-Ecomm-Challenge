const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({ include: [Product] })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create(req.body)
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(400).json(err));
});

// update category by it's 'id' value
router.put("/:id", (req, res) => {
  Category.update(req.body, { where: { id: req.params.id } })
    .then((categoryData) =>
      res.status(200).json({ message: "This category has been updated" })
    )
    .catch((err) => res.status(400).json(err));
});

// delete category by id value
router.delete("/:id", (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then((categoryData) =>
      res.status(200).json({ message: "This category has been deleted." })
    )
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
