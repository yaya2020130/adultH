module.exports =function(sequelize,Datatypes){
  const Manager=sequelize.define('Manager',{
   name:Datatypes.STRING,
   age:Datatypes.STRING
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