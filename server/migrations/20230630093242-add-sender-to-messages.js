'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 在這裡添加 'senderId' 欄位
    await queryInterface.addColumn('messages', 'senderId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 在這裡刪除 'senderId' 欄位
    await queryInterface.removeColumn('messages', 'senderId');
  }
};
