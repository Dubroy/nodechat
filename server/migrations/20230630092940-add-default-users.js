'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 在這裡添加預設用戶
    await queryInterface.bulkInsert('users', [
      { username: 'user001', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user002', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user003', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user004', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // 在這裡刪除預設用戶
    await queryInterface.bulkDelete('users', null, {});
  }
};
