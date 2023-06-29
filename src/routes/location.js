import { Router } from 'express'
import Location from '../models/location.js'
import middleware from '../middleware.js'

const routes = new Router()

routes.get('/:name', middleware('location_read'), async (req, res) => {
  const { name } = req.params;

  try {
    const location = await Location.findOne({
      where: { name }
    });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});



routes.get('/getAll', middleware('location_read'), async (request, response) => {
  try {
    const locations = await Location.findAll()

    response.json(locations)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch locations' })
  }
})

routes.post('', middleware('location_create'), async (request, response) => {
  const { name, type } = request.body

  try {
    const location = await Location.create({ name, type })

    response.status(201).json(location)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create location' })
  }
})

routes.put('/:id', middleware('location_update'), async (request, response) => {
  const { id } = request.params
  const { name, type } = request.body

  try {
    const location = await Location.findByPk(id)

    if (!location) {
      return response.status(404).json({ error: 'Location not found' })
    }

    location.name = name
    location.type = type

    await location.save()

    response.json(location)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update location' })
  }
})

routes.delete('/:id', middleware('location_delete'), async (request, response) => {
  const { id } = request.params

  try {
    const location = await Location.findByPk(id)

    if (!location) {
      return response.status(404).json({ error: 'Location not found' })
    }

    await location.destroy()

    response.json({ message: 'Location deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete location' })
  }
})

export default routes
