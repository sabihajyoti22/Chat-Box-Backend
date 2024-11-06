const app = require("./app")
const config = require("./Config/config")

const PORT = config.app.port

app.listen(PORT, () => {
  console.log(`Server is running at location http://localhost:${PORT}`)
})