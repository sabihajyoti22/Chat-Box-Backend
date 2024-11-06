const dotenv = require("dotenv")
dotenv.config()

const dev = {
  app: {
    port: process.env.PORT || 3000,
    client: process.env.FRONTEND_URL
  }
}

module.exports = dev