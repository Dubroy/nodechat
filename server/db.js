const { Sequelize } = require('sequelize');

// 創建一個 Sequelize 實例來連接到我們的資料庫
const sequelize = new Sequelize('chat_app', 'root', 'example', {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// 定義我們的 Message 模型
const Message = sequelize.define('message', {
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recipientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roomId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
// 定義 User 模型
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}, {});


module.exports = {
  sequelize,
  Message,
  User
};
