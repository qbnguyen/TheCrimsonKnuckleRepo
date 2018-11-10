module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      name: {
        type: DataTypes.STRING,
        
        allowNull: false,
        
        validate: {
          len: [1, 140]
        }
      },
      email: {
        type: DataTypes.STRING,
        
        allowNull: false,
       
        validate: {
          len: [1, 140]
        }
      }
    });

    Users.associate = function(models) {
      
      Users.belongsTo(models.Groups);
    
  }

    return Users;
  };