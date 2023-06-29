import { Router } from 'express'
import User from '../models/user.js'

const routes = new Router()

routes.get('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const user = await User.findByPk(id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    response.json(user)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch user' })
  }
})

routes.get('/getAll', async (request, response) => {
  try {
    const users = await User.findAll()

    response.json(users)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch users' })
  }
})

routes.get('/email/:email', async (request, response) => {
  const { email } = request.params

  try {
    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    response.json(user)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch user' })
  }
})

routes.get('/type/:type', async (request, response) => {
  const { type } = request.params

  try {
    const users = await User.findAll({
      where: { type }
    })

    response.json(users)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch users' })
  }
})

routes.post('', async (request, response) => {
  const { name, email, password, type } = request.body

  try {
    const user = await User.create({ name, email, password, type })

    response.status(201).json(user)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create user' })
  }
})

routes.put('/:id', async (request, response) => {
  const { id } = request.params
  const { name, email, password, type } = request.body

  try {
    const user = await User.findByPk(id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    user.name = name
    user.email = email
    user.password = password
    user.type = type

    await user.save()

    response.json(user)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update user' })
  }
})

routes.delete('/:id', async (request, response) => {
    const { id } = request.params
  
    try {
      const user = await User.findByPk(id)
  
      if (!user) {
        return response.status(404).json({ error: 'User not found' })
      }
  
      await user.destroy()
  
      response.json({ message: 'User deleted' })
    } catch (error) {
      response.status(500).json({ error: 'Failed to delete user' })
    }
  })
  
  export default routes