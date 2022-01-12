module.exports = (sequelize, Sequelize) => {
  const Prodi = sequelize.define("prodi", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Prodi;
};