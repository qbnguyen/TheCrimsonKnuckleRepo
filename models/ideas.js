module.exports = function(sequelize, DataTypes) {
    var Ideas = sequelize.define("Ideas", {
      idea: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          len: [1, 500]
        }
      },
      group_ID: {
        type: DataTypes.INTEGER
      },
      vote_val: {
        type: DataTypes.INTEGER
      },
    });
    return Ideas;
  };