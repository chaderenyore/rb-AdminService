const http = require("http");
const debug = require("debug")("app");
const app = require("./src");

require("dotenv").config();

const port = parseInt(process.env.PORT, 10);
app.set("port", port);

const server = http.createServer(app);
require("./src/_config/db")
  .createConnection()
  .then( async () => {
    await require("./src/_helpers/seedData").seedData();
    server.listen(port, async () => {
      console.log("server listening on port" + " " + port);
    });
  }).catch(error => console.log(error));;
