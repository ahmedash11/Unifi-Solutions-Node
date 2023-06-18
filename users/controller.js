const User = require("./model");

const create = async (req, res, next) => {
  try {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        return res.status(500).send("Error creating user");
      });
  } catch (err) {}
};

const findAll = async (req, res, next) => {
  try {
    User.find({})
      .then((users) => {
        req.users = users;
        next();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("Error retrieving users");
      });
  } catch (err) {}
};

const update = async (req, res, next) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("Error updating user");
      });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    User.findByIdAndDelete(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        next();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("Error deleting user");
      });
  } catch (err) {
    next(err);
  }
};

const createPipeline = [create];
const updatePipeline = [update, findOne];
const findAllPipeline = [findAll];
const findOnePipeline = [findOne];
const destroyPipeline = [destroy, findAll];

module.exports = {
  createPipeline,
  findAllPipeline,
  findOnePipeline,
  updatePipeline,
  destroyPipeline,
};
