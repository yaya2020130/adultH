
module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define('Employee', {
    firstname: DataTypes.STRING,
    lastname:DataTypes.STRING,
     age: DataTypes.INTEGER, 
     phone_no: DataTypes.INTEGER,
     email: DataTypes.STRING,
     hireDate:DataTypes.DATE,
     salary:DataTypes.DECIMAL,
     bonus:DataTypes.DECIMAL
//   start_time:{
//     // type:'TIMESTAMP',
//     // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     allowNull: true
//   },
// end_time:{
//   type:'TIMESTAMP',
//     // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     allowNull: true
// }
     
  });
  Employee.associate=function(models){
  Employee.hasMany(models.Patient,{
      foreignKey:{
        allowNull:true
      }
    });
  }

  return Employee;
};

