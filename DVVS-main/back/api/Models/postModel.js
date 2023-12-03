const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:123qwesd@localhost:3306/MyDB', {
    dialect: 'mysql',
    logging: false,
});

const Post = sequelize.define('blog', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    written_by: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync") })
module.exports = { Post, sequelize };
