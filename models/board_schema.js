module.exports = (sequelize, DataTypes) => {

    const Board = sequelize.define("Board", {
        board_name: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        board_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "board_table", // 테이블 이름
        timestamps: false
    });

    return Board;
};