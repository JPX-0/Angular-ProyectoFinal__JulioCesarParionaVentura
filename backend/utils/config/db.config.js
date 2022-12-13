const env = require("./env.config");

const dbConfig = {
  connect: () => `mongodb+srv://${env.DB_MAIL}:${env.DB_PASS}@${env.DB_DEPLOY}.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`
}

module.exports = dbConfig;