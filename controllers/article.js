const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
    
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.status(201).json({articles: articles});
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
} 

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug);
        if (article) {
            res.status(201).json({ article: article });
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    }
}
module.exports = articleController;
