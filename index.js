const express = require("express");
const configs = require("./configs");
const routes = require("./routes");
const app = express();

const mongoose = require("mongoose");

console.debug("[Mongo] Connecting @", configs.mongo.uri);
mongoose.connect(configs.mongo.uri, {
  useNewUrlParser: true,
});

app.use("/", routes);

/* app.get('/' , (req,res) => {
  res.send('hello server')
}) */
app.listen(configs.PORT, () => {
  console.log("[Server] Listening on port:", configs.PORT);
});
