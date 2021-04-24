const app = require("./app");
const PORT = 3030;

app.listen(PORT, () => {
  console.info(`sso-consumer listening on port ${PORT}`);
});
