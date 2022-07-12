const express = require("express");

const { getKeys, createKeys, modifyKey, deleteKey } = require("../controllers/userInfo");
// const { validator } = require("../../lib/middlewares/bodyValidator");
// const { userInfo, userInfoModify } = require("../../lib/utils/validationSchema");

const router = express.Router();

// router.post("/", validator(userInfo), createKeys);
// router.put("/", validator(userInfoModify), modifyKey);
router.delete("/:key", deleteKey);
router.get("/", (_, __, next) => {console.log("here");next();}, getKeys);

module.exports = router;