const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
  constructor() {
    super("article");
  }
  async findOne(slug) {
    const articles = await super.findOne("slug", slug);
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
