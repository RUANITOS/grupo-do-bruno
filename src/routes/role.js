import { Router } from 'express'
import Role from '../models/role.js'
import Permission from '../models/permission.js'
import middleware from '../middleware.js'

const routes = new Router()

routes.get('/getByName/:name', middleware('role_get'), async (request, response) => {
  const { name } = request.params

  try {
    const role = await Role.findOne({ where: { name } })

    if (!role) {
      return response.status(404).json({ error: 'Role not found' })
    }

    response.json(role)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch role' })
  }
})

routes.get('/getAll', middleware('role_get'), async (request, response) => {
  try {
    const roles = await Role.findAll()

    response.json(roles)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch roles' })
  }
})

routes.get('/getByPermission/:permission', middleware('role_get'), async (request, response) => {
  const { permission } = request.params

  try {
    const roles = await Role.findAll({
      include: [{
        model: Permission,
        as: 'permissions',
        where: { name: permission }
      }]
    })

    response.json(roles)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch roles' })
  }
})

routes.get('/getAllPermissionsByRoleName/:roleName', middleware('role_get'), async (request, response) => {
  const { roleName } = request.params

  try {
    const role = await Role.findOne({ where: { name: roleName } })

    if (!role) {
      return response.status(404).json({ error: 'Role not found' })
    }

    const permissions = await role.getPermissions()

    response.json(permissions)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch permissions' })
  }
})

routes.post('', middleware('role_create'), async (request, response) => {
  const { name, description } = request.body

  try {
    const role = await Role.create({ name, description })

    response.status(201).json(role)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create role' })
  }
})

routes.put('/:id', middleware('role_update'), async (request, response) => {
  const { id } = request.params
  const { name, description } = request.body

  try {
    const role = await Role.findByPk(id)

    if (!role) {
      return response.status(404).json({ error: 'Role not found' })
    }

    role.name = name
    role.description = description

    await role.save()

    response.json(role)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update role' })
  }
})

routes.delete('/:id', middleware('role_delete'), async (request, response) => {
    const { id } = request.params
  
    try {
      const role = await Role.findByPk(id)
  
      if (!role) {
        return response.status(404).json({ error: 'Role not found' })
      }
  
      await role.destroy()
  
      response.json({ message: 'Role deleted' })
    } catch (error) {
      response.status(500).json({ error: 'Failed to delete role' })
    }
  })
  
  export default routes