import { Router } from 'express';
import Permission from '../models/permission.js'

const routes = new Router()

// Rota para criar uma permissão
routes.post('/', async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    res.status(201).json(permission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create permission' });
  }
});

// Rota para atualizar uma permissão
routes.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    await permission.update(req.body);
    res.json(permission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update permission' });
  }
});

// Rota para excluir uma permissão
routes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    await permission.destroy();
    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete permission' });
  }
});

// Rota para listar permissões pelo nome
routes.get('/name/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const permissions = await Permission.findAll({ where: { name } });
    res.json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve permissions' });
  }
});

// Rota para listar permissões pelo acesso
routes.get('/access/:access', async (req, res) => {
  const { access } = req.params;
  try {
    const permissions = await Permission.findAll({ where: { access } });
    res.json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve permissions' });
  }
});

// Rota para buscar todas as permissões
routes.get('/', async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve permissions' });
  }
});

export default routes;