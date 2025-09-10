const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
  constructor() {
    super('author');
  }
  async findMany(where, value) {
  const query = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
  const results = await this.executeQuery(query, [value]);
  return results;
}
}

module.exports = AuthorModel; 