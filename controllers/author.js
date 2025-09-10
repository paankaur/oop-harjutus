const articleDbModel = require("../models/article");
const authorDbModel = require("../models/author");

const articleModel = new articleDbModel();
const authorModel = new authorDbModel();

class authorController {
  constructor() {
    const authors = [];
  }
  async getAuthorById(req, res) {
    const author = await authorModel.findById(req.params.author_id);
    const articles = await articleModel.findMany('author_id', author.id);
    author['articles'] = articles;
    res.status(200).json({ author : author });
  }
}
module.exports = authorController;