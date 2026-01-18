"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("UserTable", "IsActive", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });

    await queryInterface.addColumn("UserTable", "Role", {
      type: Sequelize.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("UserTable", "IsActive");
    await queryInterface.removeColumn("UserTable", "Role");
  },
};
