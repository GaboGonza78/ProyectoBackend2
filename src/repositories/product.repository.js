export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts() {
    return this.dao.getAll();
  }

  getProductById(id) {
    return this.dao.getById(id);
  }

  createProduct(product) {
    return this.dao.create(product);
  }

  updateProduct(id, data) {
    return this.dao.update(id, data);
  }

  deleteProduct(id) {
    return this.dao.delete(id);
  }
}
