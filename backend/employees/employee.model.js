const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    employeeId: { type: DataTypes.STRING, allowNull: false, unique: true },
    position: { type: DataTypes.STRING, allowNull: false },
    hireDate: { type: DataTypes.DATE, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    accountId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'accounts',
        key: 'id'
      },
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'departments',
        key: 'id'
      },
      allowNull: true
    },
  };
  
  const options = {
    timestamps: false 
  };

  return sequelize.define('employee', attributes, options);
}
