import Sequelize from "sequelize";
import configData from "../config/dbConfig.js"; // Đường dẫn tới file config của bạn
const env = process.env.NODE_ENV || "development";
const config = configData[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import thủ công các model (Ví dụ cho User)
import User from "./userModel.js";
db.User = User(sequelize, Sequelize.DataTypes);

// Nếu bạn có các quan hệ (associations), hãy gọi chúng ở đây
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
