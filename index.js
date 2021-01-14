const restify = require("restify");
const config = require("config");
const mongoose = require("mongoose");

//@Create server with restify
const server = restify.createServer();

//@Middleware
server.use(restify.plugins.bodyParser());

//@DB initialization
const connectDB = require("./src/db/db");

//@Routes
const customerRoutes = require("./src/routes/customers");
const userRoutes = require("./src/routes/user");

//@Listening port
const port = config.get("port");

server.listen(port, () => {
  connectDB();
  console.log(`Server successfully started on port: ${port}`);
});

// Check for error/success after connecting to the
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  require("./src/routes/customers")(server);
  console.log("Meow... I dey work!");
});
