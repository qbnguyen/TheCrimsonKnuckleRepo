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
        //I am not sure if this default value will work
        defaultValue: 1000
      },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue:5
      },
      password: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
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