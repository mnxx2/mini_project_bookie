module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 20],
        },
      },
    },
    {
      tableName: "users",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.BookShelf, {
      foreignKey: "userId",
      as: "bookshelf",
    });

    User.hasMany(models.Review, {
      foreignKey: "userId",
      as: "reviews",
    });

    User.hasMany(models.BookLike, {
      foreignKey: "userId",
      as: "userbooklikes",
    });

    User.hasMany(models.BookMark, {
      foreignKey: "userId",
      as: "bookmarks",
    });

    User.hasMany(models.ReviewLike, {
      foreignKey: "userId",
      as: "reviewlikes",
    });
  };

  return User;
};
