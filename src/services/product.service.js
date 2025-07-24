import ProductMongoDAO from '../dao/mongo/product.mongo.dao.js';
import ProductRepository from '../repositories/product.repository.js';

const productDAO = new ProductMongoDAO();
const productRepository = new ProductRepository(productDAO);

export default class ProductService {
  async getAllProducts() {
    return await productRepository.getAllProducts();
  }

  async getProductById(id) {
    const product = await productRepository.getProductById(id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  }

  async createProduct(productData) {
    if (!productData.title || !productData.price || !productData.code) {
      throw new Error('Faltan campos obligatorios');
    }
    return await productRepository.createProduct(productData);
  }

  async updateProduct(id, updateData) {
    const updated = await productRepository.updateProduct(id, updateData);
    if (!updated) throw new Error('No se pudo actualizar el producto');
    return updated;
  }

  async deleteProduct(id) {
    const deleted = await productRepository.deleteProduct(id);
    if (!deleted) throw new Error('No se pudo eliminar el producto');
    return deleted;
  }
}
