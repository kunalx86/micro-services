require("dotenv").config();
require("../lib/database");
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");

const { validateToken, decodeToken } = require("../lib/utils/jwt");
const { verifyAuth } = require("../lib/middlewares/auth");
const userInfoRouter = require("./routers/userInfo");

const app = express();

if (process.env.ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// If token exists save info in context
app.use(async (req, res, next) => {
  req.ctx = {
    isLoggedIn: false
  }
  const token = (req.headers["authorization"] || "").split(" ")[2];
  if (token && token !== "" && (await validateToken(token))) { 
    const ctx = await decodeToken(token);
    req.ctx = {
      ...ctx,
      isLoggedIn: true
    }
  } 
  next();
});

// Routes
app.use('/api/info', verifyAuth(), userInfoRouter)

app.use((err, _, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Something went wrong"
  });
})

app.listen(process.env.PORT || 4002, () => {
  console.log(`User Info service listening on ${process.env.URL}`);
})