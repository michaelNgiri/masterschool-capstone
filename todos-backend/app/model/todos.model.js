module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    title: {
      type: Sequelize.STRING,
    },
    completed: {
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  });

  return Todo;
};
