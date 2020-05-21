module.exports=function(sequlize,Datatypes){
  const Logbook=sequlize.define('Logbook',{
   name:Datatypes.STRING,
   date:Datatypes.DATE,
   status:Datatypes.STRING,
   isAlive:Datatypes.BOOLEAN,
   photoTaken:Datatypes.BOOLEAN,
    loggedBy: Datatypes.INTEGER
  });
   Logbook.associate=function(models){
    Logbook.belongsTo(models.Patient,{
       foreignKey:{
         allowNull:false
       }
     });
   };
  return Logbook
};