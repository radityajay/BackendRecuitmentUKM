const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
// db.prodis = require("../models/prodi.model.js")(sequelize, Sequelize);
// db.ukms = require("../models/ukm.model.js")(sequelize, Sequelize);
// db.recuitmens = require("../models/recuitment.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// db.ukms.hasMany(db.recuitmens,{
//   as: "recuitmens"
// });
// db.recuitmens.belongsTo(db.ukms,{
//   foreignKey: "ukmId",
//   as: "ukm",
// });

// db.prodis.hasMany(db.recuitmens,{
//   as: "recuitmens"
// });
// db.recuitmens.belongsTo(db.prodis,{
//   foreignKey: "prodiId",
//   as: "prodi"
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;