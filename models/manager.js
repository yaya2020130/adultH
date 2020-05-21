module.exports =function(sequelize,Datatypes){
  const Manager=sequelize.define('Manager',{
   firstname:Datatypes.STRING,
   lastname:Datatypes.STRING,
   age:Datatypes.STRING,
   email:Datatypes.STRING,
   phone_no:Datatypes.INTEGER
})
// each manager can have many employees under him
Manager.associate=function(models){
Manager.hasMany(models.Employee,{
  foreignkey:{
    allowNull:false
  }
})
}
return Manager;

}