const cors = require("cors");
const env = require("./utils/config/env.config");
const express = require("express");
const router = require("./router/index.routes");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

const connectedServer = httpServer.listen(env.PORT, () => console.log(`Server is up and running on PORT: >>> ${env.PORT}`));
connectedServer.on("error", error => console.error('There was an unexpected error in the server ', error));