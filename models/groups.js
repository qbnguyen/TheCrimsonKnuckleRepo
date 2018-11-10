module.exports = function(sequelize, DataTypes) {
    var Groups = sequelize.define("Groups", {
      admin_name: {
        type: DataTypes.STRING,
    
        allowNull: false,
    
        validate: {
          len: [1, 140]
        }
      },
      admin_email: {
        type: DataTypes.STRING,
    
        allowNull: false,
    
        validate: {
          len: [1, 140]
        }
      },
      group_name: {
        type: DataTypes.STRING,
  
        allowNull: false,
  
        validate: {
          len: [1, 140]
        }
      },
      decide_on: {
        type: DataTypes.STRING,
  
        allowNull: false,
  
        validate: {
          len: [1, 240]
        }
      },
      time: {
        type: DataTypes.TIME,
  
        defaultValue: 10
      },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue:5
      },
      password: {
        type: DataTypes.INTEGER
      },
    });

    Groups.associate = function(models) {
      //Groups has many users
      Groups.hasMany(models.Users);

      Groups.hasMany(models.Ideas, {
// Delete the ideas of a group when the group is deleted.
          onDelete: "cascade"
      });
    }

    return Groups;
  };