bcrypt =require("bcrypt")

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
      username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [8]
          }
      },
      isAdmin: {
        type:DataTypes.BOOLEAN,
        // default: false
      }
  });

  //encrypt password

 
  User.beforeCreate(function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
return User;
};
 
