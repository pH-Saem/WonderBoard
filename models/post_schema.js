const models = require("../models");
module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("Post", {
        post_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        post_title: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        post_category: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        post_content: {
            type: DataTypes.TEXT
        }
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "post_table", // 테이블 이름
        timestamps: false
    });
    Post.associate = function(models) {
        models.Post.belongsTo(models.Member, {
            foreignKey: "post_writer"
        });
    };

    return Post;
};