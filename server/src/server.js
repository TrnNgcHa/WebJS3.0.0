const app = require("./app");
require("dotenv/config");

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at http://${process.env.HOSTNAME}:${process.env.PORT}`,
  );
});

module.exports = app;
