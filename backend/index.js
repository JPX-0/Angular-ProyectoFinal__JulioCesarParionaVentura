const cors = require("cors");
const env = require("./utils/config/env.config");
const express = require("express");
// const passport = require("./api/middlewares/passport.middleware");
const router = require("./router/index.routes");
// const session = require("express-session");
const { Server: HttpServer } = require("http");
// const { create: connectMongo } = require("connect-mongo");
// const { mongodb } = require("./utils/config/db.config");

const app = express();
const httpServer = new HttpServer(app);

// const expressSession = session({
//   name: env.SESSION_NAME,
//   store: connectMongo({ mongoUrl: mongodb.connectTo("sessions") }),
//   secret: [env.SESSION_SECRET],
//   resave: false,
//   saveUninitialized: false,
// })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(expressSession);
// app.use(passport.initialize());
// app.use(passport.session());

app.use(router);

const connectedServer = httpServer.listen(env.PORT, () => console.log(`Server is up and running on PORT: >>> ${env.PORT}`));
connectedServer.on("error", error => console.error('There was an unexpected error in the server ', error));
