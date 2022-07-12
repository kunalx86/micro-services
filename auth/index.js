require("dotenv").config();
require("../lib/database");
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");

const authRouter = require("./routers/auth");

const app = express();

if (process.env.ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter)

app.use((err, _, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Something went wrong"
  });
})


app.listen(process.env.PORT || 4001, () => {
  console.log(`Auth service listening on ${process.env.URL}`);
});
