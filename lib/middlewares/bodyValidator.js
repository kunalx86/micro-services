const validator = (validatorSchema) =>
  async (req, res, next) => {
    try {
      console.log("here")
      await validatorSchema.validate(req.body, { earlyAbort: false });
      next();
    } catch (err) {
      return next(err);
    }
  }

module.exports = {
  validator
};