const BaseSQLModel = require("./base");
class userModel extends BaseSQLModel {
  constructor() {
    super("user");
  }
    async findById(id) {
    const users = await super.findById(id);
    return users;
  }
    async create(user){
        const createdUser = await super.create(user);
        return createdUser;
    }
    async update(id, data) {
    return super.update(id, data);
    }

    async delete(id) {
    return super.delete(id);
    }

}
module.exports = userModel;