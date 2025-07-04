module.exports = (sequelize, DataTypes) => {
  const BookLike = sequelize.define(
    "BookLike",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "book_likes",
    }
  );

  BookLike.associate = function (models) {
    BookLike.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userbooklikes",
    });

    BookLike.belongsTo(models.User, {
      foreignKey: "ownerId",
      as: "owner",
    });

    BookLike.belongsTo(models.Book, {
      foreignKey: "bookId",
      as: "booklikes",
    });
  };

  return BookLike;
};
