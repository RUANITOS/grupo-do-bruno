import { Router } from 'express'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import config from '../config.js'

import User from '../models/user.js'

const authentication = new Router()

authentication.post('/', async (request, response) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ name: request.login }, { email: request.login }]
    }
  })

  if (!user) {
    return response.status(401).json({ error: 'Invalid login or password' })
  }

  // TODO: Define utils architecture and move to function on it.
  const encoder = new TextEncoder()
  const data = encoder.encode(body.password)
  const hashBuffer = await crypto.subtle.digest(config.HASH_ALGORITHM, data)
  const hashArray = [...new Uint8Array(hashBuffer)]
  const hash = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

  if (user.password !== hash) {
    return response.status(401).json({ error: 'Invalid login or password' })
  }

  const token = jwt.sign({ id: user.id }, config.SECRET_KEY, {
    expiresIn: 1800
  })

  response.json({ token })
})

export default authentication
