const mongoose = require("mongoose");

(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("DB Connected")
})();