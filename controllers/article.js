const articleDbModel = require("../models/article");
const articleModel = new articleDbModel();

class articleController {
  async getAllArticles(req, res) {
    try {
      const articles = await articleModel.findAll();
      res.status(201).json({ articles: articles });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  }

  async getArticleBySlug(req, res) {
    const article = await articleModel.findOne(req.params.slug);
    if (article) {
      res.status(201).json({ article: article });
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  }
  async createArticle(req, res) {
    const newArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace("T", " "),
      author_id: req.body.author_id,
    };
    const articleId = await articleModel.create(newArticle);
    res.status(201).json({
      message: `Article created with ID: ${articleId}`,
      article: { id: articleId, ...newArticle },
    });
  }
}
module.exports = articleController;
