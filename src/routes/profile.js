import { Router } from 'express'
import Profile from '../models/profile.js'
import middleware from '../middleware.js'

const routes = new Router()

routes.get('/:name', middleware('profile_read'), async (request, response) => {
  const { name } = request.params

  try {
    const profile = await Profile.findOne({
      where: { name }
    })

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' })
    }

    response.json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profile' })
  }
})

routes.get('/getAll', middleware('profile_read'), async (request, response) => {
  try {
    const profiles = await Profile.findAll()

    response.json(profiles)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profiles' })
  }
})

routes.get('/email/:email', middleware('profile_read'), async (request, response) => {
  const { email } = request.params

  try {
    const profile = await Profile.findOne({
      where: { email }
    })

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' })
    }

    response.json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profile' })
  }
})

routes.get('/type/:type', middleware('profile_read'), async (request, response) => {
  const { type } = request.params

  try {
    const profiles = await Profile.findAll({
      where: { type }
    })

    response.json(profiles)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profiles' })
  }
})

routes.post('', middleware('profile_create'), async (request, response) => {
  const { name, email, password, type } = request.body

  try {
    const profile = await Profile.create({ name, email, password, type })

    response.status(201).json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create profile' })
  }
})

routes.put('/:id', middleware('profile_update'), async (request, response) => {
  const { id } = request.params
  const { name, email, password, type } = request.body

  try {
    const profile = await Profile.findByPk(id)

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' })
    }

    profile.name = name
    profile.email = email
    profile.password = password
    profile.type = type

    await profile.save()

    response.json(profile)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update profile' })
  }
})

routes.delete('/:id', middleware('profile_delete'), async (request, response) => {
    const { id } = request.params
  
    try {
      const profile = await Profile.findByPk(id)
  
      if (!profile) {
        return response.status(404).json({ error: 'Profile not found' })
      }
  
      await profile.destroy()
  
      response.json({ message: 'Profile deleted' })
    } catch (error) {
      response.status(500).json({ error: 'Failed to delete profile' })
    }
  })
  
  export default routes