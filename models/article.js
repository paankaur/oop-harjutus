const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
  constructor() {
    super("article");
  }
  //previously find be slug, now finds an article by id
  async findOne(id) {
    const articles = await super.findOne("id", id);
    return articles;
  }
  async create(article){
    const createdArticle = await super.create(article);
    return createdArticle;
  }
  async update(id, data) {
  return super.update(id, data);
}

}

module.exports = ArticleModel;
