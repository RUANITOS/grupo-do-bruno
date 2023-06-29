import { Router } from 'express'
import MovementItem from '../models/movement-item.js'
import middleware from '../middleware.js'

const routes = new Router()

// Rota para buscar um item de movimentação por ID
routes.get('/:name', middleware('movement_item_read'), async (request, response) => {
  const { name } = request.params

  try {
    const movementItem = await MovementItem.findOne({
      where: { name }
    })

    if (!movementItem) {
      return response.status(404).json({ error: 'Movement item not found' })
    }

    response.json(movementItem)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movement item' })
  }
})

// Rota para buscar todos os itens de movimentação
routes.get('/getAll', middleware('movement_item_read') ,async (request, response) => {
  try {
    const movementItems = await MovementItem.findAll()

    response.json(movementItems)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movement items' })
  }
})

// Rota para buscar itens de movimentação por ID de movimentação
routes.get('/movement/:movementId', middleware('movement_item_read') , async (request, response) => {
  const { movementId } = request.params

  try {
    const movementItems = await MovementItem.findAll({
      where: { movementId }
    })

    response.json(movementItems)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movement items' })
  }
})

// Rota para buscar itens de movimentação por ID de recurso
routes.get('/resource/:resourceId', middleware('movement_item_read'), async (request, response) => {
  const { resourceId } = request.params

  try {
    const movementItems = await MovementItem.findAll({
      where: { resourceId }
    })

    response.json(movementItems)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movement items' })
  }
})

// Rota para buscar itens de movimentação por ID de localização
routes.get('/location/:locationId',middleware('movement_item_read'), async (request, response) => {
  const { locationId } = request.params

  try {
    const movementItems = await MovementItem.findAll({
      where: { locationId }
    })

    response.json(movementItems)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movement items' })
  }
})

// Rota para criar um novo item de movimentação
routes.post('', middleware('movement_item_create'), async (request, response) => {
  // Dados para criar o item de movimentação
  const { movementId, resourceId, locationId } = request.body

  try {
    const movementItem = await MovementItem.create({ movementId, resourceId, locationId })

    response.status(201).json(movementItem)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create movement item' })
  }
})


// Rota para atualizar um item de movimentação
routes.put('/:id',middleware('movement_item_upadate'), async (request, response) => {
    const { id } = request.params
    const { movementId, resourceId, locationId } = request.body
  
    try {
      const movementItem = await MovementItem.findByPk(id)
  
      if (!movementItem) {
        return response.status(404).json({ error: 'Movement item not found' })
      }
  
      movementItem.movementId = movementId
      movementItem.resourceId = resourceId
      movementItem.locationId = locationId
  
      await movementItem.save()
  
      response.json(movementItem)
    } catch (error) {
      response.status(500).json({ error: 'Failed to update movement item' })
    }
  })
  
  // Rota para deletar um item de movimentação
  routes.delete('/:id',middleware('movement_item_delete'), async (request, response) => {
    const { id } = request.params
  
    try {
      const movementItem = await MovementItem.findByPk(id)
  
      if (!movementItem) {
        return response.status(404).json({ error: 'Movement item not found' })
      }
  
      await movementItem.destroy()
  
      response.json({ message: 'Movement item deleted' })
    } catch (error) {
      response.status(500).json({ error: 'Failed to delete movement item' })
    }
  })

  export default routes

  