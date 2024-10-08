const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validators");
const itemController = require("../controllers/item.controller");
const { body, param } = require("express-validator");

/**
 * @route POST /items
 * @description Register new user
 * @access Public
 */
router.post(
  "/",
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("material", "Invalid material").exists().notEmpty(),
    body("price", "Invalid price").exists().notEmpty(),
    body("color", "Invalid color").exists().notEmpty(),
    body("imgUrl", "Invalid imgUrl").exists().notEmpty(),
  ]),
  itemController.register
);
router.get("/", itemController.getItems);
router.get("/id/", itemController.getItemsById);
router.get("/filter/", itemController.filterItems);
router.get("/search/", itemController.getItemsBySearch);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
