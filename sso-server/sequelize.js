const Sequelize = require("sequelize");
const UserModel = require("./models/user");

const sequelizeOptions = {
  dialect: "postgres",
  host: "40.88.52.154",
  port: "80",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const sequelize = new Sequelize(
  "postgresdb",
  "postgresadmin",
  "admin123",
  sequelizeOptions
);

sequelize.authenticate().then(function (errors) {
  console.log(errors);
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const User = UserModel(sequelize, Sequelize);

// an aletrnative to sequelize migrate ..
// sequelize
//   .sync()
//   .then(() => {
//     console.log(`Database & tables created!`);
//   })
//   .catch((err) => console.log("not able to sync", err));

module.exports = {
  User,
};
