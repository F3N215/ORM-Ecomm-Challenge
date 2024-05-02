const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({ include: [Product] })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: [Product],
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((tagData) =>
      res.status(200).json({ message: "This tag has been updated" })
    )
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then((tagData) =>
      res.status(200).json({ message: "This tag has been deleted" })
    )
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
