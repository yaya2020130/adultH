module.exports=function(sequlize,Datatypes){
  const Patient=sequlize.define('Patient',{
    firstname:Datatypes.STRING,
    lastname:Datatypes.STRING,
    age:Datatypes.INTEGER,
    phone_number:Datatypes.INTEGER,
    addres:Datatypes.STRING,
    email:Datatypes.STRING,
    isMedicine:Datatypes.BOOLEAN,
    isFoodEaten:Datatypes.BOOLEAN,
    patientReview:Datatypes.STRING,
    doctorAppointment:Datatypes.STRING,
  

  });
  // PatientEmployee = sequelize.define('patient_employee', {
  //   date: Sequelize.STRING
  // });
  // User.belongsToMany(Project, { through: UserProject });
  // Project.belongsToMany(User, { through: UserProject });
  Patient.associate=function(models){
    Patient.belongsTo(models.Manager,{
      foreignKey:{
        allowNull:true
      }
    });
    //  Patient.belongsToMany(models.Employee,{
       
    //   foreignKey:{
    //     allowNull:false
    //   }
    // })
  };
  return Patient
};

