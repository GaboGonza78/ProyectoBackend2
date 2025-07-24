import { Router } from 'express';
import ProductService from '../services/product.service.js';

const router = Router();
const productService = new ProductService();

// GET todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ status: 'success', payload: products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.pid);
    res.json({ status: 'success', payload: product });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
});

// POST nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// PUT actualizar producto
router.put('/:pid', async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.pid, req.body);
    res.json({ status: 'success', payload: updated });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// DELETE eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.pid);
    res.json({ status: 'success', payload: deleted });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

export default router;
