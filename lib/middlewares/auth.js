const verifyAuth = (admin = false) =>
  (req, res, next) => {
    console.log(req.ctx.username)
    if (!req.ctx.isLoggedIn) return next(new Error("Not logged in"));
    if (admin && !req.ctx.isAdmin) return next(new Error("Not admin"));
    next();
  }

module.exports = {
  verifyAuth
};