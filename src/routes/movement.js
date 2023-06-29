import { Router } from 'express'
import Movement from '../models/movement.js'
import MovementItem from '../models/movement-item.js'
import middleware from '../middleware.js'

const routes = new Router()

routes.get('/:id', middleware('movement_read'), async (request, response) => {
  const { id } = request.params

  try {
    const movement = await Movement.findByPk(id, {
      include: MovementItem
    })

    if (!movement) {
      return response.status(404).json({ error: 'Movement not found' })
    }

    response.json(movement)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movement' })
  }
})

routes.get('/getAll', middleware('movement_read'), async (request, response) => {
  try {
    const movements = await Movement.findAll({
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

routes.get('/initialDate', middleware('movement_read'), async (request, response) => {
  const { startDate } = request.query

  try {
    const movements = await Movement.findAll({
      where: { startTime: startDate },
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

routes.get('/finalDate', middleware('movement_read'), async (request, response) => {
  const { endDate } = request.query

  try {
    const movements = await Movement.findAll({
      where: { endTime: endDate },
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

routes.get('/initialDateAndFinalDate', middleware('movement_read'), async (request, response) => {
  const { startDate, endDate } = request.query

  try {
    const movements = await Movement.findAll({
      where: { startTime: startDate, endTime: endDate },
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

routes.get('/location/:id', middleware('movement_read'), async (request, response) => {
  const { id } = request.params

  try {
    const movements = await Movement.findAll({
      include: [
        { model: Location, as: 'origin', where: { id } },
        { model: Location, as: 'destination', where: { id } }
      ],
      include: MovementItem
    })

    response.json(movements)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movements' })
  }
})

routes.get('/location/getName', middleware('movement_read'), async (request, response) => {
    const { name } = request.query
  
    try {
      const movements = await Movement.findAll({
        include: [
          { model: Location, as: 'origin', where: { name } },
          { model: Location, as: 'destination', where: { name } }
        ],
        include: MovementItem
      })
  
      response.json(movements)
    } catch (error) {
      response.status(500).json({ error: 'Failed to fetch movements' })
    }
  })
  
  // Rota para obter todas as movement items de um Movement
  routes.get('/:id/getAllMoviment', middleware('movement_read'), async (request, response) => {
    const { id } = request.params
  
    try {
      const movement = await Movement.findByPk(id, {
        include: MovementItem
      })
  
      if (!movement) {
        return response.status(404).json({ error: 'Movement not found' })
      }
  
      const movementItems = movement.MovementItems
  
      response.json(movementItems)
    } catch (error) {
      response.status(500).json({ error: 'Failed to fetch movement items' })
    }
  })


// Rota para criar um novo movimento
routes.post('', middleware('movement_create'), async (request, response) => {
  // Dados para criar o movimento
  const { startTime, endTime, originId, destinationId } = request.body

  try {
    const movement = await Movement.create({ startTime, endTime, originId, destinationId })

    response.status(201).json(movement)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create movement' })
  }
})

// Rota para atualizar um movimento
routes.put('/:id', middleware('movement_update'), async (request, response) => {
  const { id } = request.params
  const { startTime, endTime, originId, destinationId } = request.body

  try {
    const movement = await Movement.findByPk(id)

    if (!movement) {
      return response.status(404).json({ error: 'Movement not found' })
    }

    movement.startTime = startTime
    movement.endTime = endTime
    movement.originId = originId
    movement.destinationId = destinationId

    await movement.save()

    response.json(movement)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update movement' })
  }
})

// Rota para excluir um movimento
routes.delete('/:id', middleware('movement_delete'), async (request, response) => {
  const { id } = request.params

  try {
    const movement = await Movement.findByPk(id)

    if (!movement) {
      return response.status(404).json({ error: 'Movement not found' })
    }

    await movement.destroy()

    response.json({ message: 'Movement deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete movement' })
  }
})

  
  export default routes