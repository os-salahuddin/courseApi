module.exports = (sequelize, DataTypes) => {
    const course = sequelize.define('course', {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
        }
    });

    return course;
}