module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authors: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      publisher: {
        type: DataTypes.STRING,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      contents: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "books",
    }
  );

  Book.associate = function (models) {
    Book.hasMany(models.BookShelf, {
      foreignKey: "bookId",
      as: "bookshelfItems",
    });

    Book.hasMany(models.BookLike, {
      foreignKey: "bookId",
      as: "booklikes",
    });

    Book.hasMany(models.BookMark, {
      foreignKey: "bookId",
      as: "bookmarks",
    });

    Book.hasMany(models.Review, {
      foreignKey: "bookId",
      as: "bookreviews",
    });

    Book.hasMany(models.User, {
      foreignKey: "userId",
      as: "hasbooks",
    });
  };

  return Book;
};
