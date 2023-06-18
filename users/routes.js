const express = require("express");
const controller = require("./controller");

const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", controller.findAllPipeline, (req, res) => {
  res.status(200).json({
    users: req.users,
  });
});

router.post("/", controller.createPipeline, (req, res) => {
  res.status(201).json({
    user: req.user,
  });
});

router.patch("/:id", controller.updatePipeline, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

router.delete("/:id", controller.destroyPipeline, (req, res) => {
  res.status(204).json({
    users: req.users,
  });
});

module.exports = router;
