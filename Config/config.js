const dotenv = require("dotenv")
dotenv.config()

const dev = {
  app: {
    port: process.env.PORT || 300
  }
}

module.exports = dev