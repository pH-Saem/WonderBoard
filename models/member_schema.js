module.exports = (sequelize, DataTypes) => {

    const Member = sequelize.define("Member", {
        member_name: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        member_ID: {
            type: DataTypes.STRING(10),
            primaryKey: true
        },
        member_PW: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "member_table", // 테이블 이름
        timestamps: false
    });

    return Member;
};