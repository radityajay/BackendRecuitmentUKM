module.exports = (sequelize, Sequelize) => {
  const UKM = sequelize.define("ukm", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return UKM;
};