const express = require("express");
const { register, login, getAllUsers } = require("../controllers/auth");
const { validator } = require("../../lib/middlewares/bodyValidator");
const { verifyAuth } = require("../../lib/middlewares/auth");
const { register: registerSchema } = require("../../lib/utils/validationSchema");

const router = express.Router();

router.get("/", verifyAuth(true), getAllUsers);
router.post("/register", validator(registerSchema), register);
router.post("/login", validator(registerSchema), login);

module.exports = router;